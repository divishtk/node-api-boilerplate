const errorHandlerMiddlware = (err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Somehting went wrong",
    err:err.toString(),
  });
};

export default errorHandlerMiddlware;
