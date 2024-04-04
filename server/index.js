const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const users = require("./routes/users");

const app = express();
const PORT = 8080;

app.use(cookie());
app.use(cors());
app.use(express.json());

app.use("/users", users);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
