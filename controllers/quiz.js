const quizSchema = require("../models/quiz")
const { QuizService } = require("../services/quiz")
const Result = require("../models/result")

const {resultService} = require("../services/result")

exports.getQuizById = (req,res,next) => {
    console.log("called")
    quizSchema.findOne({_id : req.params.quizId})
    .exec( (err, quiz) => {
        if(err){
            return res.json(err)
        }
       req.quiz = quiz
       next() 
    }   )
}



       
exports.resultController = async (req,res) => {  
    let result
    if(req.quiz.correctOption === req.body.answer) {
        result = req.quiz.marksAlotted
        console.log("RESULTTt" , result)  
    }else{
        result = 0 
    }
  const results = await  resultService({ name : req.body.name , marksGained : result , category :  req.quiz.category    }) 



    results.save( (err,result) => {
        if(err){
            return res.json(err)
        }
        return res.json(result)
    }  )
}

exports.getMarks = (req,res) => {

    Result.aggregate([
        { $group: { _id: "", Totalmarks : { $sum: "$marksGained" } , average : {  $avg : "$marksGained" }     } },
        { $project : {   _id : 0     }   }
    ])
    .exec( (err,result) => {  
        if(err){
            return res.json(err)
        }
        return res.json(result)
    }  )

}



exports.getMarksByCategory = (req,res) => {

    Result.aggregate([
        { $group: { _id: "$category", Totalmarks : { $sum: "$marksGained" } , average : {  $avg : "$marksGained"     }   } }
    ])
    .exec( (err,result) => {  
        if(err){
            return res.json(err)
        }

        return res.json(result)
    }  )

}









exports.getAllQuiz = (req,res) => {

    quizSchema.find().
    exec( (err,quizs) => {
        if(err){
            return res.json(err) 
        }
        return res.json(quizs)
    }  )
}

exports.getAllQuizQuestions = (req,res) => {
    quizSchema.aggregate([
        { $match: { category: req.params.category   } }
    ]).exec( (err , quizs)  => {
        if(err){
            return res.json(err)
        }
        return res.json(quizs)
    }  )

} 




exports.getAllQuizOfCategory = (req, res) => {
    quizSchema.aggregate([
      
        { $group: { _id: "$category", Total_Questions_in_Quiz : { $sum: 1 }  } }
    ]).
        exec((err, result) => { 
            res.json(result   )
        })
} 

exports.getResult = (req, res) => {

    quizSchema.aggregate([
        // { $group: { _id: "$result", Total: { $sum: "$marks" } } }
        { $group: {_id : "$userName", Total_Questions_in_Quiz : { $sum: "$marks" }   } } 
    ]).
        exec((err, result) => {
            res.json(result)
        })

}





exports.createQuiz = async (req, res) => {
    const quiz = await QuizService(req.body)
    quiz.save((err, quiz) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }
        return res.status(200).json({
            success: "Quiz Submitted",
            quiz
        })
    })
}