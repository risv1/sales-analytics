import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import path from "path"
import {config} from "dotenv"

config({
    path: path.resolve(__dirname, "../../.env")
})

const dbUrl = "file:///"+process.env.DB_URL!
console.log(dbUrl)

const client = createClient({ url: dbUrl });

export const db = drizzle(client);
