import { buildSchema } from "graphql";

export const stockFilterSchema = buildSchema(`
  type Query {
    getSalesByProductStock(threshold: Int!): [SalesData]
  }

  type SalesData {
    id: ID!
    product: Product!
    customer: Customer!
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
`);