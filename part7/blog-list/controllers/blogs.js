const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comments");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogList = await Blog.find({})
    .populate("user", {
      username: 1,
      name: 1
    })
    .populate("comments", { message: 1 });
  response.json(blogList);
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);

    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === user.id.toString()) {
      await blog.remove();
      return response.status(204).end();
    } else {
      return response
        .status(401)
        .json({ error: "user is not allow for this operation" });
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate("user", {
      username: 1,
      name: 1
    });
    response.json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    likes: body.likes
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id/comments", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate("comments", {
      message: 1
    });

    response.json(blog.comments);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/:id/comments", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const blog = await Blog.findById(request.params.id);

    const comment = new Comment({
      message: request.body.message,
      blog: request.params.id
    });

    const savedComment = await comment.save();
    blog.comments = blog.comments.concat(savedComment._id);
    await blog.save();
    response.json(blog.comments);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
