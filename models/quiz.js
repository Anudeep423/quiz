const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    question : {
        type : String,
        required : true
    } , 
    options : {
        type : Array,
        required : true
    }, 
    category : {
        type : String,
        required : true
    },
    marksAlotted : {
        type : Number,
        required : true
    },
    correctOption : {
        type : String,
        required : true
    }
})


// quizSchema.virtual("answers","marks").set( 
//     function(answers){
//     if(answers.indexOf(this.correctOption) !== -1  ){
//         this.result = `correct` 
//     }else {
//         this.result = "incorrect"
//     }
// })

module.exports =  mongoose.model("quiz" , quizSchema );