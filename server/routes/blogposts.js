const express = require("express");
const { PrismaClient, CategoryName } = require("@prisma/client");
const auth = require("../middleware/auth");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", auth, async (req, res) => {
  const posts = await prisma.blogPost.findMany();
  res.json({ posts: posts });
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

module.exports = router;
