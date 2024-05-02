const { getDataByUserName } = require("../repository/studentRepository");
const {
  studentAttendance,
  updateStudentAttendance,
  getAllStudentAttendance,
} = require("../repository/stdAttendanceRepository");
const {logger}=require('../../logger')

const stdAttendance = async (stdUserName, status, date) => {
  try {
    logger.info('src > service > stdAttendanceService > stdAttendance')
    console.log("UserName in Service", stdUserName);
    const isExistingStudent = await getDataByUserName(stdUserName);
    console.log("IsExistingStudent", isExistingStudent);
    if (isExistingStudent) {
      const data = await studentAttendance(stdUserName, status, date);
      return data;
    } else {
      return "student Not Exist";
    }
  } catch (error) {
    throw error;
  }
};
const updateAttendance = async (stdUserName, status, date) => {
  try {
    logger.info('src > service > stdAttendanceService > updateAttendance')
    const data = await updateStudentAttendance(stdUserName, status, date);
    console.log("attendance update in service", data);
    return data;
  } catch (error) {}
};

const allAttendance = async () => {
  try {
    logger.info('src > service > stdAttendanceService > allAttendance')
    const allAttendance = await getAllStudentAttendance();
    return allAttendance;
  } catch (err) {}
};
module.exports = { stdAttendance, updateAttendance, allAttendance };
