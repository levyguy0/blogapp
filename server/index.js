const express = require("express");
const cors = require("cors");
const users = require("./routes/users");

const app = express();
const PORT = 8080;

app.use(cors());
app.use("/users", users);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
