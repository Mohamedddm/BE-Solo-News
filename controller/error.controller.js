exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "2PP02") {
    res.status(400).send({ msg: "Invalid id" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.code === 404) {
    res.status(err.status).send({ msg: "Not Found" });
  } else {
    next(err);
  }
};

exports.handle404Errors = (req, res) => {
  res.status(404).send({ msg: "Not Found" });
};

exports.handleInternalErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
};
