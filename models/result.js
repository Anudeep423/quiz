const mongoose = require("mongoose")

const Result = new mongoose.Schema({

    name : {
        type : String
    },
    category : {
        type : String
    },
    marksGained : {
        type : Number
    }

})

module.exports = mongoose.model("Result",Result)