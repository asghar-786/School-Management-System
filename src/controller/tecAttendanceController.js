const {
  tecAttendance,
  updateTecAtt,
  getTecAttendance,
} = require("../service/tecAttendanceService");
const { logger } = require("../../logger");
const teacherAttendance = async (request, reply) => {
  try {
    logger.info("src > controller > tecAttendanceController > teacherAttendance");
    const { tecUserName, status } = request.body;
    console.log("Postman Data", tecUserName, status);
    const date = new Date();
    console.log("Date", date);
    const data = await tecAttendance(tecUserName, status, date);
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
const updateTecAttendance = async (request, reply) => {
  try {
    logger.info("src > controller > tecAttendanceController > updateTecAttendance");
    const tecUserName = request.query.tecUserName; // For query parameter
    const date = request.query.date; // For query parameter
    const status = request.body.status;
    const data = await updateTecAtt(tecUserName, date, status);
    if (data) {
      reply.send({
        data: data,
      });
    }
  } catch (error) {
    throw error;
  }
};

const getAllTecAttendance = async (request, reply) => {
  try {
    logger.info("src > controller > tecAttendanceController > getAllTecAttendance");
    const data = await getTecAttendance();
    if (data) {
      reply.send({
        data: data,
      });
    }
  } catch (error) {
    throw error;
  }
};
module.exports = {
  teacherAttendance,
  updateTecAttendance,
  getAllTecAttendance,
};
