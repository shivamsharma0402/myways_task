const Blog = require('../models/blog.model');

exports.createBlog = async (req,res,next) => {
  const { title, content, author } = req.body;
  try {
    const blog = new Blog({
      title,
      content,
      author,
    });
    await blog.save();
    return res.status(200).json({ status: "success", message: "blog created!", data: blog });
  } catch(error) {
    if(!error.statusCode){
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.readBlog = async (req,res,next) => {
  try {
    const blogs = await Blog.find();
    if(!blogs.length){
      const error = new Error('No blogs found!');
      error.statusCode = 404;
      throw error;
    }
    return res.status(201).json({  status: "success", message: `${blogs.length} blog(s) found!`, data: blogs })
  } catch (err) {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateBlog = async (req,res,next) => {
  const { blogid } = req.query;
  const { updatedTitle, updatedContent, updatedAuthor } = req.body;
  console.log(updatedTitle, updatedContent, updatedAuthor);
  try {
    const blog = await Blog.findByIdAndUpdate(blogid, {
      title: updatedTitle,
      content: updatedContent,
      author: updatedAuthor,
      updatedAt: new Date()
    });
    console.log(blog);
    if(!blog) {
      const error = new Error('No blogs found!');
      error.statusCode = 404;
      throw error;
    }
      return res.status(200).json({ status: "success", message: "blog updated!" });
  } catch(error) {
    if(!error.statusCode){
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteBlog = async (req,res,next) => {
  const { blogid } = req.query;
  try {
    const blog = await Blog.findByIdAndDelete(blogid);
    if(!blog) {
      const error = new Error('No blogs found!');
      error.statusCode = 404;
      throw error;
    }
      return res.status(200).json({ status: "success", message: "blog deleted!" });
  } catch(error) {
    if(!error.statusCode){
      error.statusCode = 500;
    }
    next(error);
  }
};