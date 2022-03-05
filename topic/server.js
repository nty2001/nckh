const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors= require("cors");
app.use(cors())
app.use(express.json());
const cookie = require("cookie-parser");
app.use(cookie())

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);

const colors = require("colors");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("> Connected...".bgCyan))
  .catch((err) =>
    console.log(
      `> Error while connecting to mongoDB : ${err.message}`.underline.red
    )
  );
const userRouter=require("./routers/userRouter");
app.use("/user",userRouter)

const topicRouter=require("./routers/topicRouter");
app.use("/topic",topicRouter)

const path=require("path")
if(process.env.NODE_ENV === 'production'){
  app.use(express.static("client/build"))
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, 'client','build',"index.html"))
  })
}