import express from "express";
import bodyParser from "body-parser";
import { createHandler } from "graphql-http/lib/use/express";
import { schema as getSalesSchema } from "./schemas/getSales.schema";
import { schema as addSaleSchema } from "./schemas/addSale.schema";
import { schema as customerFilterSchema } from "./schemas/customerFilter.schema";
import { schema as dateFilterSchema } from "./schemas/dateFilter.schema";
import {
  categoryFilterSchema,
  stockFilterSchema,
} from "./schemas/productFilter.schema";
import {
  addCustomerSchema, addProductSchema
} from "./schemas/addProductCustomer.schema"
import { root as getSalesRoot } from "./resolvers/getSales.resolver";
import { root as addSaleRoot } from "./resolvers/addSale.resolver";
import { root as customerFilterRoot } from "./resolvers/customerFilter.resolver";
import { root as dateFilterRoot } from "./resolvers/dateFilter.resolver";
import { categoryRoot, stockRoot } from "./resolvers/productFilter.resolver";
import { customerRoot, productRoot } from "./resolvers/addProductCustomer.resolver";

const app = express();

app.use(bodyParser.json());

app.use(
    "/get-sales",
    createHandler({
      schema: getSalesSchema,
      rootValue: getSalesRoot,
    })
)

app.use(
    "/add-sale",
    createHandler({
      schema: addSaleSchema,
      rootValue: addSaleRoot,
    })
)

app.use(
    "/customer-filter",
    createHandler({
      schema: customerFilterSchema,
      rootValue: customerFilterRoot,
    })
)

app.use(
    "/date-filter",
    createHandler({
      schema: dateFilterSchema,
      rootValue: dateFilterRoot,
    })
)

app.use(
    "/category-filter",
    createHandler({
      schema: categoryFilterSchema,
      rootValue: stockRoot,
    })
)

app.use(
    "/add-customer",
    createHandler({
      schema: addCustomerSchema,
      rootValue: customerRoot,
    })
)

app.use(
    "/add-product",
    createHandler({
      schema: addProductSchema,
      rootValue: productRoot,
    })
)

app.use(
    "/stock-filter",
    createHandler({
      schema: stockFilterSchema,
      rootValue: stockRoot,
    })
)

app.listen(8000, () => {
  console.log("Server running at http://localhost:8000/");
});
