import { Sale } from "../models/sale.model";

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
  }): Promise<Sale> => {
    console.log(productId, customerId, quantity, date, total);
    return {
      id: "1",
      product: {
        id: "1",
        name: "Product 1",
      },
      customer: {
        id: "1",
        name: "Customer 1",
      },
      date: "2021-01-01",
      quantity: 1,
      total: 100,
    };
  },
};