exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23503") {
    res.status(400).send({ msg: "400: Invalid id" });
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
