import { gql } from "apollo-server";

const typeDefs = gql`
  type Movie {
    title: String
    year: Int
    rating: Int
    scoutbase_rating: String
    actors: [Actor]
    directors: [Director]
  }

  type Actor {
    name: String
    birthday: String
    country: Country
  }

  type Country {
    code: String!
    name: String!
    continent: Continent!
    languages: [Language!]!
    currency: String
    phone: String
  }

  type User {
    id: ID!
    name: String!
  }

  type UserResponse {
    token: String
    user: User
  }

  type Continent {
    id: ID!
    name: String
    code: String
  }

  type Language {
    id: ID!
    name: String
    code: String
    native: String
  }
  type Director {
    id: ID!
    name: String
    birthday: String
  }
  type Query {
    movies: [Movie]
    countries: [Country]
    continents: [Continent]
    languages: [Language]
  }
  type Mutation {
    createUser(username: String, password: String): UserResponse
    login(username: String, password: String): UserResponse
  }
`;

export default typeDefs;
