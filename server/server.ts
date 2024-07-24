import express from "express"
import { createHandler } from "graphql-http/lib/use/express";
import { schema as helloSchema } from "./schemas/hello.schema"
import { root as helloRoot } from "./resolvers/hello.resolver"

const app = express()

app.use(
    "/",
    createHandler({
        schema: helloSchema,
        rootValue: helloRoot,
    })
)

app.listen(8000, () => {
    console.log("Server running at http://localhost:8000/")
})