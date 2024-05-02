const dataSource = require("../Infrastructure/psql");
const userRepository = dataSource.getRepository("studentAttendance");
const {logger}=require('../../logger')
const studentAttendance = async (stdUserName, status, date) => {
  try {
    logger.info('src > Repository > stdAttendanceRepository > studentAttendance')
    const isExistingAttendance = await userRepository.findOne({
      where: {
        stdUserName,
        date,
      },
    });
    if (isExistingAttendance) {
      return {
        stdUserName: stdUserName,
        status: isExistingAttendance.status,
        date: date,
        message: " Attendance Already Marked",
      };
    } else {
      const data = await userRepository.create({
        stdUserName: stdUserName,
        status: status,
        date: date,
      });
      console.log("Student Attendance In Repo", data);
      const result = await userRepository.save({ stdUserName, status, date });
      if (result) {
        const message = "Attendance Marked Successfully";
        return {result , message}
      } else {
        return "Error marking attendance";
      }
    }
  } catch (error) {
    throw error;
  }
};

const updateStudentAttendance = async (stdUserName, date, status) => {
  try {
    logger.info('src > Repository > stdAttendanceRepository > updateStudentAttendance')
    console.log("Repository Data Update Attendance");
    console.log("UserName ", stdUserName);
    console.log("Date ", date);
    console.log("Status ", status);
    const isExistingAttendance = await userRepository.findOne({
      where: {
        stdUserName,
        date,
      },
    });
    console.log("update IsExisting", isExistingAttendance);
    if (isExistingAttendance) {
      isExistingAttendance.status = status;
      await userRepository.save(isExistingAttendance);
      console.log("After update", isExistingAttendance);

      return "Attendance Updated";
    } else {
      return "Attendance not Exist";
    }
  } catch (error) {
    throw error;
  }
};

const getAllStudentAttendance = async () => {
  try {
    logger.info('src > Repository > stdAttendanceRepository > getAllStudentAttendance')
    const allAttendance = await userRepository.find();
    if (allAttendance) {
      return allAttendance;
    } else {
      return "No record Found";
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  studentAttendance,
  updateStudentAttendance,
  getAllStudentAttendance,
};
