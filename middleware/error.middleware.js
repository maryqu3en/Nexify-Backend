module.exports.notFound = (req, res, next) => {
    const error = new Error(`Endpoint not Found ${req.originalUrl}`);
    res.status(404);
    next(error);
};

module.exports.errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};