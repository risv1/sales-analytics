import { Sale } from "../models/sale.model";

export const root = {
  getSalesDataByTopCustomers: (
    _: any,
    { limit }: { limit: number }
  ): Sale[] => {
    console.log(limit);
    return [];
  },
};
