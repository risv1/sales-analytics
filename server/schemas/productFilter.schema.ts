import { buildSchema } from 'graphql';

export const categoryFilterSchema = buildSchema(
  `
  type Query {
    sales(filter: CategoryFilterInput): [Sale]
  }

  input CategoryFilterInput {
    category: String!
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

export const stockFilterSchema = buildSchema(
  `
  type Query {
    getSalesDataByProductStock(threshold: Int!): [Sale]
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