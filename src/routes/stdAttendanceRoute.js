const {
  studentAttendance,
  updateStdAttendance,
  getAllStdAttendance,
} = require("../controller/stdAttendanceController");

const studentAttendanceRoute = async (fastify) => {
  fastify.post("/std-attendance", studentAttendance);
  fastify.put("/std-attendance", updateStdAttendance);
  fastify.get("/all-std-attendance", getAllStdAttendance);
};

module.exports = studentAttendanceRoute;
