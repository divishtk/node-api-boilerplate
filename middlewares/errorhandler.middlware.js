const errorHandlerMiddlware = (err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    success: false,
    message: "Somehting went wrong",
    err,
  });
};

export default errorHandlerMiddlware;
