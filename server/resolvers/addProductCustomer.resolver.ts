import { db } from "../database/db";
import { customers, products } from "../database/schema";
import { v4 as uuidv4 } from "uuid";

export const customerRoot = {
  addNewCustomer: async ({ name, email }: { name: string; email: string }) => {
    try {
      await db.insert(customers).values({
        id: uuidv4(),
        name,
        email,
        totalSpent: "0",
      });
      return `Customer ${name} with email ${email} added successfully.`;
    } catch (e) {
      console.error(e);
      throw new Error("Failed to add new user");
    }
  },
};

export const productRoot = {
  addNewProduct: async ({
    name,
    category,
    stock,
    price,
  }: {
    name: string;
    category: string;
    stock: number;
    price: number;
  }) => {
    try {
      await db.insert(products).values({
        id: uuidv4(),
        name,
        category,
        stock,
        price: String(price),
      });
      return `Product ${name} added successfully.`;
    } catch (e) {
      console.error(e);
      throw new Error("Failed to add new product");
    }
  },
};
