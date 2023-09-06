import fastify from "fastify";

const server = fastify({
  ajv: {
    customOptions: {
      removeAdditional: "all",
      coerceTypes: true,
      useDefaults: true,
    },
  },
  logger: {
    level: process.env.LOG_LEVEL,
  },
});

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

const PORT = 8080;
const HOST = process.env.HOST || "localhost";

server.listen({ host: HOST, port: PORT }, (err) => {
  if (err) throw err;
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () =>
    server.close().then((err) => {
      console.log(`close application on ${signal}`);
      process.exit(err ? 1 : 0);
    })
  );
}
