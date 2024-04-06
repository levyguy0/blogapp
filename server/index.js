const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const users = require("./routes/users");
const blogposts = require("./routes/blogposts");

const app = express();
const PORT = 8080;

app.use(cookie());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);
app.use(express.json());

app.use("/users", users);
app.use("/posts", blogposts);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
