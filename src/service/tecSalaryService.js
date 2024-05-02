const paySalaryToTeacher = require("../repository/tecSalaryRepository");

const payTeacher = async (tecUserName, amount) => {
  try {
    logger.info("src > controller > tecSalaryService > payTeacher");
    const data = await paySalaryToTeacher(tecUserName, amount);
    return data;
  } catch (error) {}
};
module.exports = payTeacher;
