const {
  signUpAdmin,
  loginAdmin,
  verifyEmail,
} = require("../controller/adminController");

const authRoute = async (fastify) => {
  fastify.post("/signupAdmin", signUpAdmin);
  fastify.get("/verify-email", verifyEmail);
  fastify.post("/loginAdmin", loginAdmin);
};

module.exports = authRoute;
