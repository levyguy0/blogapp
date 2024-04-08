const express = require("express");
const { PrismaClient, CategoryName } = require("@prisma/client");
const auth = require("../middleware/auth");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", auth, async (req, res) => {
  const posts = await prisma.blogPost.findMany();
  posts.forEach((post) => {
    const date = new Date(post.createdAt).toLocaleDateString();
    post.createdAt = date;
  });

  res.json({ posts: posts });
});

router.get("/byid/:id", auth, async (req, res) => {
  const post = await prisma.blogPost.findFirst({
    where: {
      id: req.params.id,
    },
  });

  post.createdAt = new Date(post.createdAt).toLocaleDateString();

  res.status(200).json({ post: post });
});

router.get("/bycategory/:category", auth, async (req, res) => {
  const validCategories = Object.values(CategoryName);

  if (!validCategories.includes(req.params.category)) {
    return res.status(400).json({ error: "Not a valid category" });
  }

  const posts = await prisma.blogPost.findMany({
    where: {
      category: req.params.category,
    },
  });

  posts.forEach((post) => {
    const date = new Date(post.createdAt).toLocaleDateString();
    post.createdAt = date;
  });

  res.status(200).json({ posts: posts });
});

router.get("/category/all", auth, async (req, res) => {
  const categories = Object.values(CategoryName);
  res.json({ categories: categories });
});

router.post("/", auth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user,
    },
  });

  const validCategories = Object.values(CategoryName);

  if (!validCategories.includes(req.body.category)) {
    return res.status(400).json({ error: "Invalid category" });
  }

  let post = {
    authorId: user.id,
    authorName: user.username,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    category: req.body.category,
  };

  try {
    post = await prisma.blogPost.create({ data: post });
    res.json({ post: post });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/", auth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user,
    },
  });

  const post = await prisma.blogPost.findUnique({
    where: {
      id: req.body.id,
    },
  });

  if (post.authorId != user.id) {
    return res
      .status(401)
      .json({ error: "Cannot delete a post you did not upload." });
  }

  await prisma.blogPost.delete({
    where: {
      id: req.body.id,
    },
  });

  res.status(200).json({ post: post });
});

module.exports = router;
