import winston from 'winston'; 

const levels = {
  debug: 0,
  http: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5,
};

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
});

const fileTransport = new winston.transports.File({
  filename: 'errors.log',
  level: 'error',
});

const developmentLogger = winston.createLogger({
  levels,
  transports: [consoleTransport]
});

const productionLogger = winston.createLogger({
  levels,
  transports: [consoleTransport, fileTransport],
});

const logger = process.env.NODE_ENV === 'production' ? productionLogger : developmentLogger;

export default logger;