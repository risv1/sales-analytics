"use client";

import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ChartConfig, ChartContainer } from "./ui/chart";
import { useEffect, useState } from "react";
import { getSales } from "../lib/fetch-all-sales";

const chartConfig = {
  product: {
    label: "Product",
    color: "#2563eb",
  },
  quantity: {
    label: "Quantity",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function DisplayChart() {
  const [salesData, setSalesData] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      const data = await getSales();
      if (data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const processedData = data.sales.map((sale: { product: { name: any; }; quantity: any; }) => ({
          product: sale.product.name,
          quantity: sale.quantity,
        }));
        console.log(processedData);
        setSalesData(processedData);
      }
    };
    fetchSales();
  }, []);

  return (
    <ChartContainer config={chartConfig} className="w-[80%] flex justify-center items-center h-[90%]">
      {salesData ? (
        <BarChart width={600} height={300} data={salesData}>
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill={chartConfig.quantity.color} radius={4} />
        </BarChart>
      ) : (
        <div>Loading...</div>
      )}
    </ChartContainer>
  );
}