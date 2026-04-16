const { ValidationError, UniqueConstraintError } = require('sequelize');

function errorHandler(err, req, res, next) {
  if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors.map((e) => e.message),
    });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
}

module.exports = errorHandler;
