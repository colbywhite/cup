import { Prisma } from '@prisma/client'
import type { MutationResolvers } from 'types/graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server'

import type { getCurrentUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { GhinClient } from 'src/lib/ghin-client'
import { logger } from 'src/lib/logger'

// TODO: figure out why RW isn't doing this automatically in WebStorm
type Context = RedwoodGraphQLContext & {
  currentUser: Awaited<ReturnType<typeof getCurrentUser>>
}

export const createGolfer: MutationResolvers<Context>['createGolfer'] = async (
  { input: { ghinNumber } },
  { context: { currentUser } }
) => {
  const golferLogger = logger.child({ ghinNumber })
  golferLogger.info('Creating golfer')
  const ghin = await GhinClient.build_client()
  const ghinGolfer = await ghin.getGolfer(ghinNumber)
  const data = Prisma.validator<Prisma.GolferCreateInput>()({
    association: ghinGolfer.association_name,
    avatar: currentUser.avatar,
    email: currentUser.email,
    ghinNumber: ghinNumber,
    name: currentUser.name,
    sex: ghinGolfer.gender === 'M' ? 'Male' : 'Female',
  })
  return db.golfer.create({ data })
}
