const studentPayFees = require("../controller/stdPayFeesController");

const stdPayFeesRoute = async (fastify) => {
  fastify.post("/std-pay-fess", studentPayFees);
};

module.exports = stdPayFeesRoute;
