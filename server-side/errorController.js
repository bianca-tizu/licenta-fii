const errorController = (err, req, res, next) => {
  res.status(500).send("An unknown error occurred.");
};

export default errorController;
