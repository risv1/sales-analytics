import { db } from "../database/db";
import { customers, products, sales } from "../database/schema";
import { eq, lt } from "drizzle-orm";

export const stockRoot = {
  getSalesDataByProductStock: async ({ threshold }: { threshold: number }) => {
    console.log("Threshold:", threshold);
    try {
      const fetchSalesByStock = await db
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
        .where(lt(products.stock, threshold));

      console.log("Query Result:", fetchSalesByStock);

      if (
        fetchSalesByStock === null ||
        fetchSalesByStock === undefined ||
        fetchSalesByStock.length === 0
      ) {
        throw new Error("No sales found for this category");
      }

      return fetchSalesByStock.map((sale) => ({
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