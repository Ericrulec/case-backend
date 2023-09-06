async function routes(fastify, options) {
  const schema = {
    body: { $ref: "createUseSchema#" },
    response: {
      201: {
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "number" },
        },
      },
    },
  };

  fastify.post("/submit", { schema }, async (request, reply) => {
    // we can use the `request.body` object to get the data sent by the client
    const result = await collection.insertOne({ animal: request.body.animal });
    return result;
  });
}

export default routes;
