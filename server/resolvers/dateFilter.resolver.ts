import { Sale } from "../models/sale.model";

export const root = {
  getSalesDataByDateRange: (
    _: any,
    { startDate, endDate }: { startDate: string; endDate: string }
  ): Sale[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    console.log(start, end);
    return [];
  },
};
