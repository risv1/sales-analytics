import { buildSchema } from "graphql";

export const schema = buildSchema(
    `
      type Query {
          getSalesDataByDateRange(startDate: String!, endDate: String!): [Sale]
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