const payStdFees = require("../service/stdPayFeesService");
const {logger}=require('../../logger')

const studentPayFees = async (request, reply) => {
  try {
    logger.info('src > controller > stdPayFeesController > studentPayFees')
    const { stdUserName, amount } = request.body;
    const data = await payStdFees(stdUserName, amount);
    if (data) {
      reply.code(200).send({
        data: data,
      });
    }
  } catch (error) {
    throw error;
  }
};
module.exports = studentPayFees;
