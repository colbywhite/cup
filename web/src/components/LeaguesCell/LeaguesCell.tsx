import type { LeaguesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query LeaguesQuery {
    leagues {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <p className="text-center">You&apos;re not enrolled in any leagues.</p>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

function idToAvatar(id: string) {
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${id}`
}
export const Success = ({ leagues }: CellSuccessProps<LeaguesQuery>) => {
  return (
    <table className="table">
      <tbody>
        {leagues.map((league) => {
          return (
            <tr key={league.id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={idToAvatar(league.id)} alt={league.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{league.name}</div>
                  </div>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
