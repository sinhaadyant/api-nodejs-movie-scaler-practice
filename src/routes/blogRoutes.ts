import express from "express";
import {
  createBlog,
  listBlogs,
  listBlogById,
  updateBlogById,
} from "../controllers/blogController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Retrieve a list of blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: A list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   body:
 *                     type: string
 *                   createdBy:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       400:
 *         description: Error fetching blogs
 */
router.get("/", listBlogs);

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The blog data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *                 createdBy:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Blog not found
 */
router.get("/:id", listBlogById);

/**
 * @swagger
 * /blogs/{id}:
 *   patch:
 *     summary: Update a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Blog not found
 */
router.patch("/:id", authMiddleware, updateBlogById);

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authMiddleware, createBlog);

export default router;
