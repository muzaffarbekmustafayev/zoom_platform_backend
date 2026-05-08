const notFound = (req, res, next) => {
    res.status(404).json({ message: `Not found: ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
    let status = err.statusCode || res.statusCode;
    if (!status || status === 200) status = 500;

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        status = 400;
        err.message = 'Invalid resource ID';
    }
    if (err.code === 11000) {
        status = 409;
        const field = Object.keys(err.keyValue || {})[0] || 'field';
        err.message = `Duplicate ${field}`;
    }
    if (err.name === 'ValidationError') {
        status = 400;
    }

    if (process.env.NODE_ENV !== 'test') {
        console.error(`[${req.method} ${req.originalUrl}] ${status} ${err.message}`);
        if (status >= 500) console.error(err.stack);
    }

    res.status(status).json({
        message: err.message || 'Server error',
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
};

module.exports = { notFound, errorHandler };
