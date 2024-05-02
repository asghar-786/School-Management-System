const dataSource = require("../Infrastructure/psql");
const userRepository = dataSource.getRepository("teacherAttendance");
const {logger}=require('../../logger')
const markTeacherAttendance = async (tecUserName, status, date) => {
  try {
    logger.info("src > repository > tecAttendanceRepository > markTeacherAttendance");
    const isExistingAttendance = await userRepository.findOne({
      where: {
        tecUserName,
        date,
      },
    });
    if (isExistingAttendance) {
      return {
        tecUserName: tecUserName,
        status: isExistingAttendance.status,
        date: date,
        message: "Attendance Already Marked",
      };
    } else {
      const data = userRepository.create({
        tecUserName: tecUserName,
        status: status,
        date: date,
      });
      const SaveResult = userRepository.save(data);
      return SaveResult;
    }
  } catch (error) {
    throw error;
  }
};

const updateTeacherAttendance = async (tecUserName, date, status) => {
  try {
    logger.info("src > repository > tecAttendanceRepository > updateTeacherAttendance");
    console.log("Repository Data Update Attendance");
    console.log("UserName ", tecUserName);
    console.log("Date ", date);
    console.log("Status ", status);
    const isExistingAttendance = await userRepository.findOne({
      where: {
        tecUserName,
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

const getAllTeacherAttendance = async () => {
  try {
    logger.info("src > repository > tecAttendanceRepository > getAllTeacherAttendance");
    const data = await userRepository.find();
    if (data) {
      return data;
    } else {
      return "No Record Found";
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  markTeacherAttendance,
  updateTeacherAttendance,
  getAllTeacherAttendance,
};
