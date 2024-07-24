import { buildSchema } from "graphql";

export const schema = buildSchema(
    `
      type Query {
          getSalesData: GetSalesData
      }
  
      type GetSalesData {
          products: [Product]
          sales: [Sale]
          customers: [Customer]
      }
  
      type Product {
          id: ID!
          name: String!
          category: String!
          price: Float!
          stock: Int!
      }
  
      type Sale {
          id: ID!
          product: Product
          customer: Customer
          date: String!
          quantity: Int!
          total: Float!
      }
  
      type Customer {
          id: ID!
          name: String!
          email: String!
          totalSpent: Float!
      }
    `
  );