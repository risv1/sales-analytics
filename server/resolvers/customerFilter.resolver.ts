import { db } from "../database/db"
import { customers, products, sales } from "../database/schema"
import { desc, eq, gt } from "drizzle-orm";
 
export const root = {
  getSalesDataByTopCustomers: async(
    { threshold }: { threshold: number }
  ) => {
    try{
       const fetchSales = await db.select({
        saleId: sales.id,
        productId: sales.productId,
        productName: products.name,
        customerId: sales.customerId,
        customerName: customers.name,
        date: sales.date,
        quantity: sales.quantity,
        total: sales.total,
       }).from(sales)
        .innerJoin(customers, eq(sales.customerId, customers.id))
        .innerJoin(products, eq(sales.productId, products.id))
        .where(gt(customers.totalSpent, String(threshold)))
        .orderBy(desc(customers.totalSpent))

      if (fetchSales.length === 0) {
        throw new Error("No sales data found for the given threshold")
      }

      fetchSales.map((sale) => { 
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
        }
      })
    } catch(e) {
      console.error(e)
      throw new Error("An error occurred while fetching sales data");
    }
  },
};
