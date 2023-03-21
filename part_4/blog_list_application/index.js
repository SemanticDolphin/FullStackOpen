require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();

const mongoUrl = process.env.MONGODB_URI;
console.log(`connecting to ${mongoUrl}`);
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => response.json(blogs));
});

app.post("/api/blogs", (request, response) => {
  console.log(request.body);
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
