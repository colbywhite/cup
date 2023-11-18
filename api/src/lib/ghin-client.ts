import * as forge from 'node-forge'
import invariant from 'tiny-invariant'

import { logger } from 'src/lib/logger'

const GHIN_BASE_URL = new URL('https://api2.ghin.com/')
const GHIN_PUBLIC_KEY =
  '`-----BEGIN RSA PUBLIC KEY-----\nMIICCgKCAgEA4bj0vrhe3nejC07r9jYt9ieLM1QoqnmgkRcKOJAkCve/PWK/8+SX\nuQumFYAnSvuBhicYwyARGJY8NzIHSMVQU3eOn6HpnVY6f2uWaMnH3OwEYHSV6fXt\n2e/vy4eY/Lf8qhaQ0Jlnntluycvk4UtNdpf/3zM1hv3G0mt0ckVnzjqpUmSZ7SEn\nTec6lVBnLnQ9NWH2iswaCB5Szr4E6tRu+dN7U2juixaHYC9STLBUTd3VhCbBZrtT\nv+w/ZOo+NZ4mGAf7RMAUNiO0dVQyGLU/MyzUAwOXQQUMp7iqTYoEP6laFojapNkP\nP6sETHRWwJStr/O5tEPZGrnzqttjK3ImyHKnXXVoPtB3GthxLJ4m+hglGxw5WeaK\nWhGX1AR0nVDTBppRqv5+hbfzSIDmlfFkt23nj4fZ5A75uZ/O+Ivs8xMoIoqws1jT\neDQ8xDSgqyb3D6R/DH6P7yodYF/xwhGPBbenFxyBGPPvXjNODwHMNFMcbrvsj2YS\n9Rcf/OrkDCLxWnXevMU+sS3wY8cH6q7u4HIKCyOgaE+Fm++CaSuHp5OfjQnoaLJt\nYV+1IB3l2XE6T8BEQL19Ov9JCeuvfvpamvV/MUOuIKexIBGqiYpc6kLWTpd25Kmj\nYsplwBjsy1Vogbc3S4G8H8Ixd1ap0vxTqYNmTLLGHlL7d64xbKUU1YsCAwEAAQ==\n-----END RSA PUBLIC KEY-----`'
const SOURCE = 'GHINcom'

type GHINGolfer = {
  first_name: string
  last_name: string
  gender: 'M' | 'F'
  email: string
  phone_number: string
  suffix: unknown
  prefix: unknown
  middle_name: string | null
  status: string
  ghin: string
  handicap_index: string
  association_id: number
  association_name: string
  club_name: string
  club_id: number
  state: string
  country: string
  low_hi: string
  soft_cap: string
  hard_cap: string
  entitlement: boolean
  club_affiliation_id: number
  is_home_club: boolean
  rev_date: string
  hi_value: number
  hi_display: string
  message_club_authorized: unknown
  low_hi_value: number
  low_hi_display: string
  low_hi_date: string | null
  has_digital_profile: boolean
}

type GHINGolfersResponse = { golfers: GHINGolfer[] }

async function validateAndParseJson<T = unknown>(response: Response) {
  if (!response.ok) {
    logger.error(
      'Error returned from GHIN %s %j',
      response.statusText,
      response.headers
    )
    const body: T = await response.json()
    logger.error('Error returned from GHIN %s', JSON.stringify(body))
    throw new Error(response.statusText)
  }
  return (await response.json()) as Promise<T>
}

function assertNonEmptyString(value: unknown, message?: string) {
  invariant(typeof value === 'string' && value.length > 0, message)
  return value
}

function parseGhinVars() {
  const GHIN_USER = assertNonEmptyString(
    process.env.GHIN_USER,
    'Missing GHIN_USER env var'
  )
  const GHIN_PASSWORD = assertNonEmptyString(
    process.env.GHIN_PASSWORD,
    'Missing GHIN_PASSWORD env var'
  )
  return { GHIN_USER, GHIN_PASSWORD }
}

export class GhinClient {
  private headers: { 'Content-Type': 'application/json'; Authorization: string }

  private constructor(private token: string) {
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }
  }

  public async getGolfer(ghinNumber: string | number) {
    const id = Number(ghinNumber)
    invariant(!isNaN(id), `ghin number (${ghinNumber}) is not a number`)
    const url = new URL(
      `api/v1/golfers.json?status=Active&golfer_id=${id}&from_ghin=true&per_page=1&page=1`,
      GHIN_BASE_URL
    )
    const { golfers } = await fetch(url, { headers: this.headers }).then(
      validateAndParseJson<GHINGolfersResponse>
    )
    invariant(golfers.length === 1, `No golfers found for ${ghinNumber}`)
    return golfers[0]
  }

  static async build_client() {
    const { GHIN_PASSWORD, GHIN_USER } = parseGhinVars()
    const publicKey = forge.pki.publicKeyFromPem(GHIN_PUBLIC_KEY)
    const data = { source: SOURCE, datetime: new Date().toISOString() }
    const token = forge.util.encode64(publicKey.encrypt(JSON.stringify(data)))
    const body = {
      user: {
        password: GHIN_PASSWORD,
        email_or_ghin: GHIN_USER,
        remember_me: false,
      },
      token,
      source: SOURCE,
    }
    return fetch(new URL('api/v1/golfer_login.json', GHIN_BASE_URL), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(
        validateAndParseJson<{ golfer_user: { golfer_user_token: string } }>
      )
      .then(({ golfer_user }) => new GhinClient(golfer_user.golfer_user_token))
  }
}
