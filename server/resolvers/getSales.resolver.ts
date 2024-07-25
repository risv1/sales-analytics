import type { Sale } from "../models/sale.model";
import { db } from "../database/db";
import { customers, products, sales } from "../database/schema";
import { eq } from "drizzle-orm";

export const root = {
  getSalesData: async () => {
    try {
      const result = await db.transaction(async (tx) => {
        const fetchAllDetails = await tx
          .select({
            salesId: sales.id,
            productId: sales.productId,
            customerId: sales.customerId,
            productName: products.name,
            productCategory: products.category,
            productPrice: products.price,
            productStock: products.stock,
            customerName: customers.name,
            customerEmail: customers.email,
            customerTotalSpent: customers.totalSpent,
            date: sales.date,
            quantity: sales.quantity,
            total: sales.total,
          })
          .from(sales)
          .innerJoin(products, eq(sales.productId, products.id))
          .innerJoin(customers, eq(sales.customerId, customers.id));

        console.log("Fetched Details:", fetchAllDetails);

        if (!fetchAllDetails || fetchAllDetails.length === 0) {
          throw new Error("No sales data found");
        }

        const productsList: Array<{ id: string; name: string; category: string; price: number; stock: number }> = [];
        const salesList: Sale[] = [];
        const customersList: Array<{ id: string; name: string; email: string; totalSpent: number }> = [];

        fetchAllDetails.forEach((sale) => {
          if (!productsList.find((product) => product.id === sale.productId)) {
            productsList.push({
              id: sale.productId,
              name: sale.productName,
              category: sale.productCategory,
              price: Number(sale.productPrice),
              stock: sale.productStock,
            });
          }

          if (!customersList.find((customer) => customer.id === sale.customerId)) {
            customersList.push({
              id: sale.customerId,
              name: sale.customerName,
              email: sale.customerEmail,
              totalSpent: Number(sale.customerTotalSpent),
            });
          }

          salesList.push({
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
            total: Number(sale.total),
          });
        });

        return {
          products: productsList,
          sales: salesList,
          customers: customersList,
        };
      });

      return result;
    } catch (e) {
      console.error(e);
      throw new Error("Error fetching sales data");
    }
  },
};