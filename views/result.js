const express = require("express"); 

const Router = express.Router();

const { getQuizById , resultController, getMarks,getMarksByCategory} = require("../controllers/quiz")

Router.param("quizId",getQuizById)

     
Router.post("/takequiz/:quizId" , resultController)

Router.get("/getmarks" , getMarks  )

Router.get("/getmarksbycategory" , getMarksByCategory  )


module.exports = Router;