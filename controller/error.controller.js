exports.handelPsqlError = (err, req, res, next) => {
  if (err.code === "2PP02") {
    res.status(400).send({ msg: "Invalid id" });
  } else {
    next(err);
  }
};
