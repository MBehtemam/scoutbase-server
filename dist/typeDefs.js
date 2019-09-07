"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
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

  type Director {
    name: String
    birthday: String
    country: Country
  }

  type Country {
    code: Int!
    name: String!
    continent: String!
    languages: [String!]!
    currency: String
    phone: Int
  }

  type User {
    id: ID!
    name: String!
  }

  type loginResponse {
    token: String
    user: User
  }

  type Continent {
    id: ID!
    name: String
    code: String
  }

  type Query {
    movies: [Movie]
    countries: [Country]
    continents: [Continent]
  }
`;
exports.default = typeDefs;
