const express = require("express"); 

const Router = express.Router();

const {createQuiz,getResult, getAllQuizOfCategory , getAllQuiz ,
     getAllQuizQuestions , getQuizById , resultController, getMarks,getMarksByCategory} = require("../controllers/quiz")


Router.param("quizId",getQuizById)

Router.post("/create/quiz" , createQuiz )

// Router.get("/getResult",getResult)

Router.get("/getallquizofcategory",getAllQuizOfCategory) 

Router.get("/getallquiz" , getAllQuiz )

Router.get("/getallquizquestionsbycategory/:category",getAllQuizQuestions)


Router.get("/getmarks" , getMarks  )

Router.get("/getmarksbycategory" , getMarksByCategory  )



module.exports = Router;

