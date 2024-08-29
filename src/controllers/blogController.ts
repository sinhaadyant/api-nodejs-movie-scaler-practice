import { Request, Response } from "express";
import joiValidate from "../utils/joiValidation";
import { blogSchema } from "../validationSchema/blogValidation";
import Blog from "../models/Blog";
export const createBlog = async (req: any, res: Response) => {
  try {
    // Validation
    const validationResult = joiValidate(req, blogSchema);
    if (validationResult.error) {
      return res.status(400).json({ errors: validationResult.details }); // Return field-specific errors
    }

    const { title, body } = req.body;
    const newBlog = new Blog({
      title,
      body,
      createdBy: req.user.id, // Use the authenticated user's ID
    });
    res.status(201).json({
      status: true,
      message: "Blog Created Successfully",
      data: { _id: newBlog._id },
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
