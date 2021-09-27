const ErrorResponse = require("../util/errorResponse");

const errorHandler = (inputError, req, res, next) => {
  console.log("Error handler");
  let defaultError = {...inputError}
  defaultError.message = inputError.message;

  let newErrorResponse = undefined;
  
  // Mongoose bad ObjectId
  if(inputError.name === "CastError") {
    newErrorResponse = {
      statusCode: 404,
      response: {
        errorType: "ClientFail",
        content: `Resource not found with id of ${inputError.value}`
      }
    }
  }

/*   // Mongoose duplicate key
  if(inputError.code === 11000) {
    const message = "Duplicate field value entered";
    defaultError = new ErrorResponse(message, 409);
  }

  // Mongoose validation error
  if(inputError.name === 'ValidationError') {
    responseError = {
      statusCode: 400,
      response: {
        errorType: "validation",
        content: Object.entries(inputError.errors).map(error => {
          let property = error[1].properties;
          return {[property.path]: property.message};
        })
      }
    }
  } */

  if(newErrorResponse) {
    res.status(newErrorResponse.statusCode).json(newErrorResponse.response);
  } else {
    res.status(500).json({
      errorType: "Unknown",
      content: "An unexpected server error occurred"
    })
  }
};

module.exports = errorHandler;
