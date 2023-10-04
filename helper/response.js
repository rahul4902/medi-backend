exports.successResponse = (res, msg, data = [], status = 200) => {
  return res.status(200).json({ status: status, message: msg, data: data });
};
exports.errorResponse = (res, msg, status = 400) => {
  return res.status(200).json({ status: status, message: msg });
};
exports.validationResponse = (res, msg, errors = [], status = 422) => {
  return res.status(200).json({ status: status, message: msg, errors: errors });
};
