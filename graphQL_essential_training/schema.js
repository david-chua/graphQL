import { buildSchema } from 'graphql';

const Schema = buildSchema(`
  type Friend {
    id: ID
    firstName: String
    lastName: String
    gender: String
    age: Int
    language: String
    emails: String
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
  }

  type Query{
    getFriend(id: ID): Friend
  }

  input FriendInput {
    id: ID
    firstName: String!
    lastName: String
    gender: Gender
    age: Int
    language: String
    email: String
  }

  type Mutation {
    createFriend(input: FriendInput): Friend
  }
`)

export default Schema;
