import { buildSchema } from "graphql";

export const addCustomerSchema = buildSchema(
  `
        type Mutation {
           addNewCustomer(name: String!, email: String!): String
        }
        type Query {
            _empty: String 
        }
    `
);

export const addProductSchema = buildSchema(
  `
        type Mutation {
            addNewProduct (name: String!, category: String! ,stock: Int!, price: Float!): String
        }
        type Query {
            _empty: String 
        }
    `
);
