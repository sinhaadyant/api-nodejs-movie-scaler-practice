const express = require("express");
const router = express.Router();

const {
  handleGetAllBlogs,
  handleGetBlogsByID,
  handleCreateBlog,
} = require("../controllers/blog");

const { ensureAuthenticated } = require("../middlewares/auth");
// Public Route
router.get("/", handleGetAllBlogs);

router.get("/:id", handleGetBlogsByID);

//Protected Route
// Add
router.post("/", ensureAuthenticated, handleCreateBlog);

// Update
// Protected + Authorize
// router.patch("/:id", ensureAuthenticated);

// Delete
// Protected + Authorize
// router.delete("/:id", ensureAuthenticated);

module.exports = router;
