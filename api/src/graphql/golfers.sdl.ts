export const schema = gql`
  type Golfer {
    email: String!
    name: String!
    avatar: String!
    association: String!
    ghinNumber: Int!
    sex: Sex!
  }

  enum Sex {
    Male
    Female
  }

  type Mutation {
    createGolfer(input: CreateGolferInput!): Golfer! @requireAuth
  }

  input CreateGolferInput {
    ghinNumber: Int!
  }
`
