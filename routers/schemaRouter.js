async function routes(fastify, options) {
  const schema = {
    body: { $ref: "norwegianSchema#" },
    response: {
      201: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
      },
    },
  };

  fastify.post("/submit", { schema }, async (request, reply) => {
    reply("Hello");
  });
}

export default routes;
