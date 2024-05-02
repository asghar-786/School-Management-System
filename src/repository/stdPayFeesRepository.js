const { getDataByUserName } = require("./studentRepository");
const dataSource = require("../Infrastructure/psql");
const userRepository = dataSource.getRepository("students");
const {logger}=require('../../logger')
const payStudentFees = async (stdUserName, amount) => {
  try {
    logger.info('src > Repository > stdPayFeesService > payStdFees')
    let PayFees, TotalRemainingFees, clearFees;
    const isExistingStudent = await getDataByUserName(stdUserName);
    console.log("IsExistingStudent", isExistingStudent);
    if (isExistingStudent) {
      console.log("Fees Of Existing Student", isExistingStudent.fees);
      if (amount >= isExistingStudent.fees) {
        PayFees = isExistingStudent.fees - amount;
        isExistingStudent.fees = PayFees;
        TotalRemainingFees = isExistingStudent.fees;
      }
      if (TotalRemainingFees < 0) {
        clearFees = TotalRemainingFees - TotalRemainingFees;
        isExistingStudent.fees = clearFees;
        await userRepository.save(isExistingStudent);
        console.log("After Pay Fees", isExistingStudent);
        return `Fees Paid SuccessFully
                    Take Your Rest Amount ${TotalRemainingFees}`;
      }
      if (clearFees == 0) {
        await userRepository.save(isExistingStudent);
        console.log("After Pay Fees", isExistingStudent);
        return `Fees Paid Successfully `;
      }
      if (amount < isExistingStudent.fees) {
        return "Fees Can not be Paid b/c paid fees is less than Actual Fees";
      }
    } else {
      return "UserName Not Found";
    }
  } catch (error) {
    throw error;
  }
};
module.exports = payStudentFees;
