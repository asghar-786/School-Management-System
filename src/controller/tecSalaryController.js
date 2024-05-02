const payTeacher = require("../service/tecSalaryService");
const { logger } = require("../../logger");
const teacherPay = async (request, reply) => {
  try {
    logger.info("src > controller > tecSalaryController > teacherPay");
    const { tecUserName, amount } = request.body;

    const data = await payTeacher(tecUserName, amount);
    if (data) {
      reply.code(200).send({
        data: data,
      });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = teacherPay;
