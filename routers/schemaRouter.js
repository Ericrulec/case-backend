async function routes(fastify, options) {
  const schema = {
    body: { $ref: "norwegianSchema#" },
    }
  };

  fastify.post("/submit", {
    schema,

    preHandler: async (request, reply) => {
      // Honeypot will contain data if the form was filled by a bot
      if (request.body.honeypot) {
        throw { status: "failure", message: "Invalid request" };
      }
      const URLregex =
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&=]*)/;
      // Check to see if `name` or `address` contain URLs, i.e. bots
      if (
        URLregex.test(request.body.name) ||
        URLregex.test(request.body.address)
      ) {
        throw { status: "failure", message: "Invalid request" };
      }
      const zipdata = request.zipcode_data;
      if (!zipdata.has(request.body.zipcode)) {
        throw { status: "failure", message: "Invalid zipcode" };
      }
      const correspondingCity = zipdata.get(request.body.zipcode).toLowerCase();
      if (correspondingCity !== request.body.city.toLowerCase()) {
        throw { status: "failure", message: "Zipcode does not match city" };
      }
    },

    handler: async (request, reply) => {
      return { status: "success" };
    },
  });
}

export default routes;
