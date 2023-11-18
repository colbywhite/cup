import { Prisma } from '@prisma/client'
import type { MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { GhinClient } from 'src/lib/ghin-client'
import { logger } from 'src/lib/logger'

export const createGolfer: MutationResolvers['createGolfer'] = async (
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
