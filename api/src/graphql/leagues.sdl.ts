export const schema = gql`
  type League {
    id: String!
    name: String!
  }

  type Season {
    id: String!
    name: String!
  }

  type Query {
    leagues: [League!] @requireAuth(roles: ["golfer"])
  }

  type Mutation {
    createLeague(input: CreateLeagueInput!): League!
      @requireAuth(roles: ["golfer"])
    createSeason(leagueId: String!, input: CreateSeasonInput!): Season!
      @requireAuth(roles: ["golfer"])
  }

  input CreateSeasonInput {
    name: String!
    sessions: [CreateSessionInput!]!
  }

  input CreateLeagueInput {
    name: String!
    season: CreateSeasonInput!
  }

  input CreateSessionInput {
    startDate: Date!
    endDate: Date!
  }
`
