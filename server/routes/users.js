const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  "/signup",
  [
    [
      body("username")
        .isLength({ min: 4, max: 16 })
        .withMessage("Must be between 4 and 16 characters long."),
      body("name").notEmpty(),
      body("email").isEmail().notEmpty().withMessage("Must be a valid email."),
      body("password")
        .isLength({ min: 8 })
        .withMessage("Must be at least 8 characters long."),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    let user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(400).json({ error: "Already Registered" });
    }

    user = {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try {
      user = await prisma.user.create({
        data: user,
      });
      res.json({ user: user });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Error creating user" });
    }
  }
);

router.post("/login", async (req, res) => {
  // check if users email found in db
  let user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.status(400).json({ error: `No account registered to ${email}` });
  }

  //if yes, check if db pwd matches request body pwd
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: `Invalid email or password` });
  } else {
    const token = jwt.sign(user.id, process.env.JWT_SECRET);
    res
      .cookie("auth", token, {
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .send("Logged in");
  }
});

router.get("/me", auth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user,
    },
  });

  res
    .status(200)
    .json({ user: { username: user.username, email: user.email } });
});

router.get("/logout", auth, async (req, res) => {
  res.clearCookie("auth").status(200).send("Sucessfully logged out.");
});

module.exports = router;
