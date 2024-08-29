// src/routes/blogRoutes.ts
import express from "express";
import { createBlog, listBlogs } from "../controllers/blogController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", listBlogs);

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
