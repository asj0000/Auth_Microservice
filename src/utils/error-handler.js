const { StatusCodes } = require( 'http-status-codes');
class AppError extends Error {
    constructor( 
            name = 'AppError' , 
            explanation = 'Something went wrong', 
            message = 'Something went wrong', 
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR
        )
        {
            super(message);
            this.name = name;
            this.explanation = explanation;
            this.statusCode = statusCode;
        }

}
module.exports = AppError;