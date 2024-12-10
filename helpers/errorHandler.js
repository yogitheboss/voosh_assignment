const errorHandler = (data, res) => {
  const { statusCode, message } = data;
  res.status(statusCode).json({
    error: true,
    data: null,
    status: statusCode,
    message: message,
  });
};

export { errorHandler };
