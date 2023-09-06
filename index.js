import Fastify from "fastify";
import routes from "./routers/schemaRouter";

const fastify = Fastify({
  ajv: {
    customOptions: {
      removeAdditional: "all",
      coerceTypes: true,
      useDefaults: true,
    },
  },
  logger: {
    level: process.env.LOG_LEVEL || 3,
  },
});

fastify.addSchema({
  $id: "createUseSchema",
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string",
    },
  },
});

fastify.register(routes, { prefix: "/" });

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
