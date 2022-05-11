const mongoose = require("mongoose");
const Joi = require("joi");


const postSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true, minlength: 2, maxlength: 2048 },
  date: { type: Date, default: Date.now() }, // Optional Relative Date (countdown from today)
  likes: { type: Number, default: 0 },
});

function validatePost(post) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    text: Joi.string().min(2).max(2048).required(),
    likes: Joi.number()
  });
  return schema.validate(post);
}

const Post = mongoose.model("Post", postSchema);


exports.postSchema = postSchema;
exports.Post = Post;
exports.validatePost = validatePost;
