const {
  stdAttendance,
  updateAttendance,
  allAttendance,
} = require("../service/stdAttendanceService");

const { logger } = require("../../logger");

const studentAttendance = async (request, reply) => {
  try {
    logger.info('src > controller > stdAttendanceController > studentAttendance')
    const { stdUserName, status } = request.body;
    console.log("Postman Data", stdUserName, status);
    const date = new Date();
    console.log("Date", date);
    const data = await stdAttendance(stdUserName, status, date);
    console.log("Data in Controller", data);
    if (data) {
      reply.code(200).send({
        data: data,
      });
    } else {
      reply.code(400).send({
        data: data,
      });
    }
  } catch (error) {
    throw error;
  }
};

const updateStdAttendance = async (request, reply) => {
  try {
    logger.info('src > controller > stdAttendanceController > updateStdAttendance')
    const stdUserName = request.query.stdUserName; // For query parameter
    const date = request.query.date; // For query parameter
    const status = request.body.status;
    const data = await updateAttendance(stdUserName, date, status);
    if (data) {
      reply.code(200).send({
        data: data,
      });
    }
  } catch (error) {
    throw error;
  }
};

const getAllStdAttendance = async (request, reply) => {
  try {
    logger.info('src > controller > stdAttendanceController > getAllStdAttendance')
    const allData = await allAttendance();
    if (allData) {
      reply.code(200).send({
        status: "success",
        data: allData,
      });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  studentAttendance,
  updateStdAttendance,
  getAllStdAttendance,
};
