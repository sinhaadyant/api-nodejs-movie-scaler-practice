import Joi from "joi";

// Validation schema for blog
export const blogSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  body: Joi.string().min(50).max(500).required(),
});
