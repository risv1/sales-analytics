import { buildSchema } from "graphql";

export const schema = buildSchema(
    `
      type Mutation {
          addSale(productId: ID!, customerId: ID!, quantity: Int!, date: String!, total: Float!): Sale
      }
  
      type Sale {
          id: ID!
          product: Product
          customer: Customer
          date: String!
          quantity: Int!
          total: Float!
      }
  
      type Product {
          id: ID!
          name: String!
      }
  
      type Customer {
          id: ID!
          name: String!
      }
    `
  );