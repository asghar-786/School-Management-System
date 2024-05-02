const {
  signUpTeacher,
  loginTeacher,
  allTeachers,
  teachersById,
  delTeacher,
  teacherUpdate,
} = require("../service/teacherService");
const { logger } = require("../../logger");

const { validateTeacher, loginValidation } = require("../schema/teacherSchema");
const teacherSignup = async (request, reply) => {
  try {
    logger.info("src > controller > teacherController > teacherSignup ");
    const teachersData = request.body;
    const { error } = validateTeacher.validate(teachersData);
    if (error) {
      return reply.code(400).send({ error: error.details[0].message });
    }
    const data = await signUpTeacher(teachersData);
    console.log("Teachers Data in Controller", data);
    if (data) {
      reply.code(200).send({ data });
    }
  } catch (error) {
    throw error;
  }
};

const teacherLogin = async (request, reply) => {
  try {
    logger.info("src > controller > teacherController > teacherLogin ");
    const payload = ({ userName, email, password } = request.body);
    console.log("Payload in Controller ", payload);
    const { error } = loginValidation.validate(request.body);
    if (error) {
      return reply.code(400).send({ error: error.details[0].message });
    }
    const data = await loginTeacher(payload);
    console.log("Data in Controller", data);
    if (data) {
      reply.code(200).send({
        data: data,
      });
    }
  } catch (error) {
    throw error;
  }
};

const getAllTeachers = async (request, reply) => {
  try {
    logger.info("src > controller > teacherController > getAllTeachers ");
    const data = await allTeachers();
    if (data) {
      reply.code(200).send({
        status: "success",
        data: data,
      });
    }
  } catch (error) {
    throw error;
  }
};

const getTeachersById = async (request, reply) => {
  try {
    logger.info("src > controller > teacherController > getTeachersById");
    const id = request.params.id;
    const data = await teachersById(id);
    if (data) {
      reply.code(200).send({
        data: data,
      });
    }
  } catch (error) {
    throw error;
  }
};

const deleteTeacherById = async (request, reply) => {
  try {
    logger.info("src > controller > teacherController > getTeachersById");
    const id = request.params.id;
    const data = await delTeacher(id);
    if (data) {
      reply.code(200).send({
        data: data,
      });
    }
  } catch (error) {
    throw error;
  }
};

const updateTeacher = async (request, reply) => {
  try {
    logger.info("src > controller > teacherController > updateTeacher");
    const id = request.params.id;
    const teacherData = request.body;
    const data = await teacherUpdate(id, teacherData);
    if (data) {
      reply.code(200).send({
        data: data,
      });
    }
  } catch (error) {
    throw error;
  }
};
module.exports = {
  teacherSignup,
  teacherLogin,
  getAllTeachers,
  getTeachersById,
  deleteTeacherById,
  updateTeacher,
};
