const express = require("express")
const cors = require("cors")
const connection = require("./config/db")
const userController = require("./routes/user.routes")
const postsRouter = require("./routes/post.routes")


const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Home page")
})

// middlewares
app.use("/user", userController)
// app.use(authentication)
app.use("/posts", postsRouter)


app.listen(8080, async () => {
    try{
        await connection
        console.log("DB connected")
    }
    catch(err){
        console.log("error occur")
        console.log(err)
    }
    console.log("Listning on port 8080")
})