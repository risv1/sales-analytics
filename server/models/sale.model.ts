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