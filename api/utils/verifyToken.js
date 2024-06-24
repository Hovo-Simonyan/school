const jwt = require("jsonwebtoken");

const verifyToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace("Bearer ", "");
    const { adminId } = jwt.verify(token, process.env.SECRET);
    return adminId;
  }
};

module.exports = verifyToken;
