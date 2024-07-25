import { Sale } from "../models/sale.model";
import { db } from "../database/db";
import { customers, products, sales } from "../database/schema";
import { eq } from "drizzle-orm";

export const root = {
  getSalesData: async () => {
    try {
      await db.transaction(async (tx) => {
        const fetchAllDetails = await tx
          .select({
            products: products,
            sales: sales,
            customers: customers,
          })
          .from(sales)
          .fullJoin(products, eq(sales.productId, products.id))
          .fullJoin(customers, eq(sales.customerId, customers.id));

        if (!fetchAllDetails) {
          throw new Error("No sales data found");
        }

        if (fetchAllDetails.length === 0) {
          throw new Error("No sales data found");
        }

        fetchAllDetails.map((data)=>{
          return {
            products: data.products,
            sales: data.sales,
            customers: data.customers
          }
        })

      });
    } catch (e) {
      console.error(e);
      throw new Error("Error fetching sales data");
    }
  },
};
