import dotenv from "dotenv";
dotenv.config();
import Fastify from "fastify";
import fs from "fs";

// Fastify instance initialized
const fastify = Fastify({
  ajv: {
    customOptions: {
      removeAdditional: "all",
      coerceTypes: true,
      useDefaults: true,
    },
  },
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

// Share zipcode validation data via preHandler Hook
const postnummer = fs.readFileSync(
  "./data/Postnummerregister-ansi.txt",
  "utf8"
);
let zipcode_data = new Map();
postnummer.split("\n").map((line) => {
  const [zipcode, city] = line.split("\t");
  zipcode_data.set(zipcode, city);
});
// decorateRequest will add the key to the request prototype
fastify.decorateRequest("zipcode_data", "");
fastify.addHook("preHandler", (request, reply, next) => {
  request.zipcode_data = zipcode_data;
  next();
});

// Routes
import routes from "./routers/schemaRouter.js";
fastify.register(routes, { prefix: "/" });

// Add Static schemas
import { norwegianschema } from "./schemas/baseSchema.js";
fastify.addSchema(norwegianschema);

// Server error handling and startup
const PORT = process.env.PORT;
const HOST = process.env.HOST || "localhost";

fastify.listen({ host: HOST, port: PORT }, (err) => {
  if (err) throw err;
});

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () =>
    fastify.close().then((err) => {
      console.log(`close application on ${signal}`);
      process.exit(err ? 1 : 0);
    })
  );
}
