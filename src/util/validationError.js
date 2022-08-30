class ValidationError extends Error {
    constructor(message, name, errors) {
      super(message);
      this.name = name;
      this.errors = errors;
    }
  }
  
  module.exports = ValidationError;