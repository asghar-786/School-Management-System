const teacherPay = require("../controller/tecSalaryController");

const tecSalaryRoute = async (fastify) => {
  fastify.post("/tec-pay", teacherPay);
};
module.exports = tecSalaryRoute;
