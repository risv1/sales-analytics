import { defineConfig } from "drizzle-kit";
import path from "path";
import { config } from "dotenv";

config({
  path: path.resolve(__dirname, "../.env"), 
})

export default defineConfig({
  schema: "./database/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});