const errorHandler = (inputError, req, res, next) => {
  let defaultError = { ...inputError };
  defaultError.message = inputError.message;

  let newErrorResponse = undefined;

  if (inputError.name === "CastError" || inputError.name === "NotFoundError") {
    newErrorResponse = {
      statusCode: 404,
      response: {
        errorType: "ClientFail",
        content: `${inputError.message} not found with id of ${inputError.value}`,
      },
    };
  }

  if (inputError.code === 11000) {
    newErrorResponse = {
      statusCode: 409,
      response: {
        errorType: "ClientFail",
        content: "Duplicate field value entered",
      },
    };
  }

  if (inputError.name === "ValidationError") {
    newErrorResponse = {
      statusCode: 422,
      response: {
        errorType: "validation",
        content: Object.entries(inputError.errors).map((error) => {
          let property = error[1].properties;
          return { [property.path]: property.message };
        }),
      },
    };
  }

  if (newErrorResponse) {
    res.status(newErrorResponse.statusCode).json(newErrorResponse.response);
  } else {
    res.status(500).json({
      errorType: "Unknown",
      content: "An unexpected server error occurred",
    });
  }
};

module.exports = errorHandler;
