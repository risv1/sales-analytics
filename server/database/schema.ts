import { integer, numeric, text, SQLiteTimestamp, sqliteTable } from "drizzle-orm/sqlite-core"
import {sql} from "drizzle-orm"

export const products = sqliteTable("products", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    price: numeric("price").notNull(),
    stock: integer("stock").notNull(),
})

export const customers = sqliteTable("customers", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    totalSpent: numeric("totalSpent").notNull(),
})

export const sales = sqliteTable("sales", {
    id: text("id").primaryKey(),
    productId: text("productId").notNull(),
    customerId: text("customerId").notNull(),
    quantity: integer("quantity").notNull(),
    date: text("date").notNull().default(sql`(current_timestamp)`),
    total: numeric("total").notNull(),
})