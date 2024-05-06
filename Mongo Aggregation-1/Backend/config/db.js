const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://ashwiniprakash231996:8252672662@social-media-posts.g5tnpyd.mongodb.net/?retryWrites=true&w=majority&appName=social-media-posts"
);

module.exports = connection;