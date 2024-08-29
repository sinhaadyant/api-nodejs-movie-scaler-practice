import { Request, Response } from "express";
import joiValidate from "../utils/joiValidation";
import { blogSchema } from "../validationSchema/blogValidation";
import Blog from "../models/Blog";
import { deleteCache, getCache, setCache } from "../utils/cache";
const cacheKey = "blogs";
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
    // Clear the cached blogs list after creating a new blog
    await deleteCache(cacheKey);
    res.status(201).json({
      status: true,
      message: "Blog Created Successfully",
      data: { _id: newBlog._id },
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
export const listBlogs = async (req: any, res: Response) => {
  try {
    const cachedBlogs = await getCache(cacheKey); // Check if cached data exists
    if (cachedBlogs) {
      return res.status(200).json({
        status: true,
        message: "Blogs Fetched Successfully from Cache",
        data: cachedBlogs,
      });
    }
    const blogs = await Blog.find({});
    // Cache the fetched blogs
    await setCache(cacheKey, blogs, 3600); // Cache for 1 hour
    res.status(201).json({
      status: true,
      message: "Blog Fetched Successfully",
      data: blogs,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
