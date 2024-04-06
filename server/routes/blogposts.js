const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const posts = await prisma.blogPost.findMany();
  res.json({ posts: posts });
});

module.exports = router;
