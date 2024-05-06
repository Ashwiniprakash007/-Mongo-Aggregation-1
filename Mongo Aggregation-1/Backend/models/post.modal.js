const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    device: {type: String, required: true},
})

const postModel = mongoose.model("posts", postSchema)


module.exports = postModel

