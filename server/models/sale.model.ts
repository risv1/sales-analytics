import { CustomerRep } from "./customer.model";
import { ProductRep } from "./product.model";

export type Sale = {
    id: string;
    product: ProductRep;
    customer: CustomerRep;
    date: string;
    quantity: number;
    total: number;
  }

  export type FullSale = {
    id: string;
    productId: string;
    customerId: string;
    productName: string;
    productCategory: string;
    productPrice: number;
    productStock: number;
    customerName: string;
    customerEmail: string;
    customerTotalSpent: number;
    date: string;
    quantity: number;
    total: number;
  }