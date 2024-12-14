const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");

// Configure Winston logger with Loki transport
const options = {
  transports: [
    new LokiTransport({
      host: "http://127.0.0.1:3100",
      serviceName: "Database-Backend-Service" // Replace with your app name
    })
  ]
};

// Create a logger instance
const logger = createLogger(options);

module.exports = {
    logger
};
