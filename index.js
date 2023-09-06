import dotenv from "dotenv";
dotenv.config();
import Fastify from "fastify";

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
