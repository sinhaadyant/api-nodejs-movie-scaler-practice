import Joi from "joi";

// Validation schema for blog
export const blogSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  body: Joi.string().min(50).max(500).required(),
});
export const idSchema = Joi.object({
  id: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.base": `"id" should be a type of 'string'`,
      "string.empty": `"id" cannot be an empty field`,
      "any.required": `"id" is a required field`,
      "string.pattern.base": `"id" must be a valid 24-character MongoDB ObjectId`,
    }),
});
