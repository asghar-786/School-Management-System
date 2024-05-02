const dataSource = require("../Infrastructure/psql");
const userRepository = dataSource.getRepository("teacher");
const tecAttRepository = dataSource.getRepository("teacherAttendance");
const { getTeacherByUserName } = require("./teacherRepository");

const paySalaryToTeacher = async (tecUserName, amount) => {
  try {
    logger.info("src > controller > tecSalaryRepository > paySalaryToTeacher");
    const isExistingTeacher = await getTeacherByUserName(tecUserName);
    console.log("IsExistingTeacher", isExistingTeacher);

    if (isExistingTeacher) {
      const TotalAttendance = await tecAttRepository.find({
        where: { tecUserName },
      });
      console.log("Total Attendance", TotalAttendance);

      const absentCount = TotalAttendance.filter((attendance) => attendance.status === "absent").length;
      console.log("Absent Count", absentCount);

      let Detection = 0;
      if (absentCount > 3) {
        Detection = (absentCount - 3) * 1000;
        console.log("Detection Amount", Detection);
        isExistingTeacher.salary -= Detection;
      }

      let pay = isExistingTeacher.salary - amount;
      console.log("Pay", pay);
      let message;

      if (pay < 0) {
        isExistingTeacher.salary = 0;
        message = `Teacher ${tecUserName} has overpaid by ${-pay}. Salary reset to 0.`;
      } else {
        isExistingTeacher.salary = pay;
        message = `Teacher ${tecUserName} has to pay salary ${isExistingTeacher.salary}.`;
      }
      await userRepository.save(isExistingTeacher);
      console.log("After Payment Adjustment", isExistingTeacher);

      let message2 = "Teacher paid successfully their salary.";

      return { message, message2 };
    } else {
      return "Teacher not found.";
    }
  } catch (error) {
    throw error;
  }
};

module.exports = paySalaryToTeacher;
