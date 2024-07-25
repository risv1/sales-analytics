import { and, eq, gte, lte } from "drizzle-orm";
import { db } from "../database/db";
import { customers, products, sales } from "../database/schema";
import { Sale } from "../models/sale.model";

export const root = {
  getSalesDataByDateRange: async (
    _: any,
    { startDate, endDate }: { startDate: string; endDate: string }
  ) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    try {
      const fetchSalesWithDates = await db
        .select({
          saleId: sales.id,
          productId: sales.productId,
          productName: products.name,
          customerId: sales.customerId,
          customerName: customers.name,
          date: sales.date,
          quantity: sales.quantity,
          total: sales.total,
        })
        .from(sales)
        .innerJoin(customers, eq(sales.customerId, customers.id))
        .innerJoin(products, eq(sales.productId, products.id))
        .where(
          and(
            gte(sales.date, start.toISOString()),
            lte(sales.date, end.toISOString())
          )
        );

      if (fetchSalesWithDates.length === 0) {
        throw new Error("No sales data found for the given date range");
      }

      return fetchSalesWithDates.map((sale) => {
        return {
          id: sale.saleId,
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
        };
      });
    } catch (e) {
      console.error(e);
      throw new Error("An error occurred while fetching sales data");
    }
  },
};
