const {teacherSignup,teacherLogin,getAllTeachers,getTeachersById,deleteTeacherById,updateTeacher} = require('../controller/teacherController');

const teacherRoute = async (fastify) => {
    fastify.post("/register-teacher", teacherSignup);
    fastify.post("/teacher-login",teacherLogin)
    fastify.get("/teachers",getAllTeachers)
    fastify.get("/teachers/:id",getTeachersById)
    fastify.delete("/teachers/:id",deleteTeacherById)
    fastify.put("/teachers/:id",updateTeacher)
};

module.exports = teacherRoute;
