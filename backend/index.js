require("dotenv").config();
const connectDb = require("./db/db");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const express = require("express");
const cors = require("cors");
const app = express();

connectDb();

app.use(cors());
app.use(express.json());
app.use(`/api/users`, usersRouter);
app.use(`/api/posts`, postsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
