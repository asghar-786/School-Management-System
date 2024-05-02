const {
  teacherAttendance,
  updateTecAttendance,
  getAllTecAttendance,
} = require("../controller/tecAttendanceController");

const tecAttendanceRoute = async (fastify) => {
  fastify.post("/tec-attendance", teacherAttendance);
  fastify.put("/tec-attendance", updateTecAttendance);
  fastify.get("/all-tec-attendance", getAllTecAttendance);
};
module.exports = tecAttendanceRoute;
