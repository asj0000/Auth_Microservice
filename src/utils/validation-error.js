const AppError = require('./error-handler');
const { StatusCodes } = require( 'http-status-codes');

class ValidationError extends AppError {
    constructor(error ){
        let errorName = error.name;
        let explanation = [] ;
        explanation = error.errors.map( err => err.message)
        super(
            errorName, // name of the error
            explanation,
            "Not able to validate the data sent in the request" , // message
            StatusCodes.BAD_REQUEST // status code for the error
        )
    }
    

}

module.exports = ValidationError;