const validate = (schema, source = 'body') => (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
        abortEarly: false,
        stripUnknown: true,
        convert: true
    });
    if (error) {
        return res.status(400).json({
            message: 'Validation failed',
            details: error.details.map(d => ({ path: d.path.join('.'), message: d.message }))
        });
    }
    req[source] = value;
    next();
};

const mongoose = require('mongoose');
const validateObjectId = (param = 'id') => (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
        return res.status(400).json({ message: `Invalid ${param}` });
    }
    next();
};

module.exports = { validate, validateObjectId };
