const mockRequiresAuth = (req, res, next) => {
  if (req.headers.authorization === "Bearer mock-access-token") {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

module.exports = { mockRequiresAuth };
