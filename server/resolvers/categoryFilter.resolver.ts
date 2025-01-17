import { db } from "../database/db";
import { customers, products, sales } from "../database/schema";
import { eq } from "drizzle-orm";

export const categoryRoot = {
  getSalesByProductCategory: async ({ category }: { category: string }) => {
    try {
      const fetchSalesByCategory = await db
        .select({
          salesId: sales.id,
          productId: products.id,
          customerId: customers.id,
          productName: products.name,
          customerName: customers.name,
          productCategory: products.category,
          date: sales.date,
          quantity: sales.quantity,
          total: sales.total,
        })
        .from(sales)
        .innerJoin(products, eq(sales.productId, products.id))
        .innerJoin(customers, eq(sales.customerId, customers.id))
        .where(eq(products.category, category));

      if (
        fetchSalesByCategory === null ||
        fetchSalesByCategory === undefined ||
        fetchSalesByCategory.length === 0
      ) {
        throw new Error("No sales found for this category");
      }

      return fetchSalesByCategory.map((sale) => ({
        id: sale.salesId,
        product: {
          id: sale.productId,
          name: sale.productName,
        },
        customer: {
          id: sale.customerId,
          name: sale.customerName,
        },
        date: sale.date,
        quantity: sale.quantity,
        total: sale.total,
      }));
    } catch (e) {
      console.error(e);
      throw new Error("Error fetching sales data");
    }
  },
};
