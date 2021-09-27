class ErrorResponse extends Error {
  constructor(message, name, value) {
    super(message);
    this.name = name;
    this.value = value;
  }
}

module.exports = ErrorResponse;
