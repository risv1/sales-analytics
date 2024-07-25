import { buildSchema } from "graphql";

export const schema = buildSchema(
    `
      type Query {
          getSalesDataByTopCustomers(threshold: Float!): [Sale]
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