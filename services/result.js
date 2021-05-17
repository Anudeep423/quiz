const Result = require("../models/result")


exports.resultService = ( data) => {
    const results = new Result(data)
    return results
}