import { db } from "../database/db";
import { customers, products, sales } from "../database/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export const root = {
  addSale: async ({
    productId,
    customerId,
    quantity,
    date,
    total,
  }: {
    productId: string;
    customerId: string;
    quantity: number;
    date: string;
    total: number;
  }) => {
    console.log(productId, customerId, quantity, total);
    try {
      await db.transaction(async (tx) => {
        const [fetchCustomer] = await tx
          .select()
          .from(customers)
          .where(eq(customers.id, customerId));
        if (fetchCustomer === null || fetchCustomer === undefined) {
          throw new Error("Customer not found");
        }

        const [fetchProduct] = await tx
          .select()
          .from(products)
          .where(eq(products.id, productId));

        if (fetchProduct === null || fetchProduct === undefined) {
          throw new Error("Product not found");
        }

        const total = Number(fetchProduct.price) * quantity;

        const newSale = {
          id: uuidv4(),
          productId: fetchProduct.id,
          customerId: fetchCustomer.id,
          total: total.toString(),
          quantity: quantity,
        };

        const insertSale = await tx.insert(sales).values(newSale);
        if (insertSale === null) {
          throw new Error("Failed to insert sale");
        }

        return {
          id: newSale.id,
          product: {
            id: fetchProduct.id,
            name: fetchProduct.name,
          },
          customer: {
            id: fetchCustomer.id,
            name: fetchCustomer.name,
          },
          date: date,
          quantity: quantity,
          total: total,
        };
      });
    } catch (e) {
      console.error(e);
      throw new Error("Failed to add sale");
    }
  },
};
