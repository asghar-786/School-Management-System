const {
  StudentSignup,
  allStudents,
  getStudentsById,
  updateStudentsById,
  deleteStudentsById,
  loginStudent,
} = require("../controller/studentController");

const studentRoutes = async (fastify) => {
  fastify.post("/register-student", StudentSignup);
  fastify.post("/loginStudent", loginStudent);
  fastify.get("/students", allStudents);
  fastify.get("/students/:id", getStudentsById);
  fastify.put("/students/:id", updateStudentsById);
  fastify.delete("/students/:id", deleteStudentsById);
};
module.exports = studentRoutes;
