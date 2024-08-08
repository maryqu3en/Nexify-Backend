const logger = (req, res, next) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const milliseconds = (seconds * 1000 + nanoseconds / 1e6).toFixed(3);
    console.log(`${new Date().toISOString()} - ${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl} - ${res.statusCode} - ${milliseconds}ms`);
  });

  next();
};

module.exports.logger = logger;