const validateInvestmentId = (req, res, next) => {
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    res.sendStatus(400);
    return;
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error("Error processing the request: ", err);
  res.status(500).send("Error processing the request: ", err);
};

module.exports = { validateInvestmentId, errorHandler };
