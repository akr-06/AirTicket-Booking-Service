const { StatusCodes } = require('http-status-codes')

class ValidationError extends Error {
    constructor(){
        this.message = "Not able to validate" ,
        this.explaination = explaination,
        this.statusCode = statusCode
    }
}

module.exports = ValidationError;