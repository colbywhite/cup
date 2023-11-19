import type { Prisma } from '@prisma/client'
import invariant from 'tiny-invariant'
import type { MutationResolvers, QueryResolvers } from 'types/graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server'

import type { getCurrentUser } from 'src/lib/auth'
import { db } from 'src/lib/db'

// TODO: figure out why RW isn't doing this automatically in WebStorm
type Context = RedwoodGraphQLContext & {
  currentUser: Awaited<ReturnType<typeof getCurrentUser>>
}

export const leagues: QueryResolvers<Context>['leagues'] = (
  _,
  { context: { currentUser } }
) => {
  return db.league.findMany({
    select: { id: true, name: true },
    where: { commissionerEmail: currentUser.email },
  })
}

export const createLeague: MutationResolvers<Context>['createLeague'] = (
  { input },
  { context: { currentUser } }
) => {
  const data = {
    name: input.name,
    commissioner: { connect: { email: currentUser.email } },
    seasons: {
      create: {
        name: input.season.name,
        sessions: {
          createMany: {
            data: input.season.sessions.map((session) => ({
              startDate: session.startDate,
              endDate: session.endDate,
            })),
          },
        },
      },
    },
  } satisfies Prisma.LeagueCreateInput
  return db.league.create({
    data,
    select: { id: true, name: true },
  })
}

export const createSeason: MutationResolvers<Context>['createSeason'] = async (
  { input },
  { context: { currentUser } }
) => {
  const league = await db.league.findUnique({
    where: { id: input.leagueId, commissionerEmail: currentUser.email },
  })
  invariant(league !== null, `League ${input.leagueId} not found`)
  const data = {
    name: input.name,
    sessions: {
      createMany: {
        data: input.sessions.map((session) => ({
          startDate: session.startDate,
          endDate: session.endDate,
        })),
      },
    },
    league: {
      connect: {
        id: league.id,
      },
    },
  } satisfies Prisma.SeasonCreateInput
  return db.season.create({
    data,
    select: { id: true, name: true },
  })
}
