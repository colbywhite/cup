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
    leagues: [League!] @requireAuth
  }

  type Mutation {
    createLeague(input: CreateLeagueInput!): League! @requireAuth
    createSeason(input: CreateSeasonInput!): Season! @requireAuth
  }

  input CreateSeasonInput {
    name: String!
    leagueId: String!
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
