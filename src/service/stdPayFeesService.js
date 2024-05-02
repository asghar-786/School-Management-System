const payStudentFees = require("../repository/stdPayFeesRepository");
const {logger}=require('../../logger')

const payStdFees = async (stdUserName, amount) => {
  try {
    logger.info('src > service > stdPayFeesService > payStdFees')
    const data = await payStudentFees(stdUserName, amount);
    return data;
  } catch (error) {
    throw error;
  }
};
module.exports = payStdFees;
