/* eslint-disable no-useless-escape */

// Schema validation targeting a norwegian citizen, i.e. norwegian zipcode/city/number
export const norwegianschema = {
  $id: "norwegianSchema",
  type: "object",
  required: ["name", "address", "zipcode", "city", "country", "tlf", "email"],
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 36,
    },
    address: {
      type: "string",
      minLength: 2,
      maxLength: 36,
    },
    zipcode: {
      type: "string",
      minLength: 4,
      maxLength: 4,
    },
    city: {
      type: "string",
      minLength: 1,
      maxLength: 36,
    },
    country: {
      type: "string",
      minLength: 1,
      maxLength: 36,
    },
    tlf: {
      type: "string",
      pattern: "/^(0047|\+47|47)?[2-9]\d{7}$/",
      minLength: 8,
      maxLength: 8,
    },
    email: {
      type: "string",
      pattern: "^\\S+@\\S+\\.\\S+$",
      format: "email",
      minLength: 6,
      maxLength: 127,
    },
  },
};
