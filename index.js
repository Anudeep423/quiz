const express = require("express");

const app = express();

require("dotenv").config();

const mongoose = require("mongoose"); 

const quizRoutes = require("./views/quiz")

const bodyParser = require("body-parser")

const testRoutes = require("./views/result")

const port = 8080

app.use(bodyParser.json())

app.get( "/" , (req,res) => {
    res.json("Route is working")
}  )

app.use("/api",quizRoutes) 

app.use("/api",testRoutes);


mongoose
  .connect(process.env.DATABASE , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  }).catch(err => {console.log(err)} )




app.listen( port , () => { console.log("Port started running")    }  )