const quizSchema = require("../models/quiz");


exports.QuizService =  (data) => {

    const quiz =  new quizSchema(data);

    return quiz



}



