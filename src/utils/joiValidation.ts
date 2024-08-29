import { Request } from "express";
import Joi from "joi";

const joiValidate = (req: Request, schema: Joi.Schema) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  // If there are validation errors, format them
  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path[0], // Get the field name
      message: detail.message, // Get the error message
    }));

    return { error: true, details: errors };
  }

  return { error: false, value };
};

export default joiValidate;
