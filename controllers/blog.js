const Blog = require("../models/blog");
exports.handleGetAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    return res.json({ status: true, data: blogs });
  } catch (error) {
    return res.json({
      status: false,
      message: `Something went wrong ${error}`,
    });
  }
};
exports.handleGetBlogsByID = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    return res.json({ status: true, data: blog });
  } catch (error) {
    return res.json({
      status: false,
      message: `Something went wrong ${error}`,
    });
  }
};
exports.handleCreateBlog = async (req, res) => {
  const { title, body } = req.body;
  const userId = req.user._id;

  const blog = await Blog.create({ title, body, createdBy: userId });
  return res.json({ status: true, data: { id: blog._id } });
};
