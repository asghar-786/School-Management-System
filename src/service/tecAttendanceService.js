const { getTeacherByUserName } = require("../repository/teacherRepository");
const {logger}=require('../../logger')

const {
  markTeacherAttendance,
  updateTeacherAttendance,
  getAllTeacherAttendance,
} = require("../repository/tecAttendanceRepository");

const tecAttendance = async (tecUserName, status, date) => {
  try {
    logger.info("src > service > tecAttendanceService > tecAttendance");
    console.log("Tec UserName in service", tecUserName);
    const isExistingTeacher = await getTeacherByUserName(tecUserName);
    console.log("IsExisting In Service", isExistingTeacher);
    if (isExistingTeacher) {
      const data = await markTeacherAttendance(tecUserName, status, date);
      return data;
    } else {
      return "No Tec Found With This userName";
    }
  } catch (error) {
    throw error;
  }
};

const updateTecAtt = async (tecUserName, date, status) => {
  try {
    logger.info("src > service > tecAttendanceService > updateTecAtt");
    const IsExistingTeacher = await getTeacherByUserName(tecUserName);
    if (IsExistingTeacher) {
      const data = await updateTeacherAttendance(tecUserName, date, status);
      return data;
    } else {
      return "Teacher Not Found With this UserName";
    }
  } catch (error) {}
};

const getTecAttendance = async () => {
  try {
    logger.info("src > service > tecAttendanceService > getTecAttendance");
    const data = await getAllTeacherAttendance();
    return data;
  } catch (error) {
    throw error;
  }
};
module.exports = { tecAttendance, updateTecAtt, getTecAttendance };
