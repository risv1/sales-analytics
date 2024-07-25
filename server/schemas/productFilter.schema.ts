import { buildSchema } from 'graphql';

export const categoryFilterSchema = buildSchema(
  `
  type Query {
    getSalesByProductCategory(category: String!): [Sale]
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
    getSalesByProductStock(threshold: Int!): [Sale]
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