const express = require("express");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.modal");

const postsRouter = express.Router();

// GET /posts - Get posts of logged in user
postsRouter.get("/", async (req, res) => {
    const userId= req.headers.userId
    console.log(userId)
   const notes = await postModel.find({userId})
   res.send(notes)
});

// POST /posts/add - Add a new post for logged in user
postsRouter.post("/add", async (req, res) => {
    
    const {title, body, device, } = req.body;
    const new_note = new postModel({
        title,
        body,
        device,
    })
    console.log(new_note,"nn")
    await new_note.save()
    res.send({"message": "note created", new_note}) 
});

// PUT /posts/update - Update a post of logged in user
postsRouter.put("/update/:postId", async (req, res) => {
   
    const { postId } = req.params;
    const { title, body, device } = req.body;

    try {
        const updatedTodo = await postModel.findByIdAndUpdate(
            postId,
            { $set: { title, body, device } },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Todo updated", todo: updatedTodo });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// DELETE /posts/delete - Delete a post of logged in user
postsRouter.delete("/delete/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        
        const deletedPost = await postModel.findOneAndDelete({ _id: postId });
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found or unauthorized" });
        }
        res.json({ message: "Post deleted successfully", post: deletedPost });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = postsRouter;
