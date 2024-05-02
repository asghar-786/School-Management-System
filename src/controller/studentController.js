const {
  SignupStudent,
  getAllStudents,
  dataById,
  updateData,
  studentDeletebyId,
  studentLogin,
} = require("../service/studentService");

const {validateStudent,loginValidation,} = require("../schema/studentScheema");
const { logger } = require("../../logger");

const StudentSignup = async (request, reply) => {
  try {
    logger.info("src > studentRoutes > StudentController");
    const userData = request.body;
    console.log("UserData in Controller", userData);
    const { error } = validateStudent.validate(request.body);
    console.log("Validate Error ", error);
    if (error) {
      return reply.code(400).send({ error: error.details[0].message });
    }
    const user = await SignupStudent(userData);
    if (user) {
      reply.code(200).send({
        status: "success",
        user: user,
      });
    }
  } catch (error) {
    throw error;
  }
};

const allStudents = async (request, reply) => {
  try {
    logger.info("src > controller  > studentController > allStudents");
    const StudentsData = await getAllStudents();
    if (StudentsData) {
      reply.send({
        code: 200,
        status: "success",
        StudentsData: StudentsData,
      });
    }
  } catch (error) {
    console.log("Controller Err", error);
    throw error;
  }
};

const getStudentsById = async (request, reply) => {
  try {
    logger.info("Src > studentController > getStudentsById");
    const id = request.params.id;
    console.log("Id in Controller ", id);

    const getData = await dataById(id);
    if (getData) {
      reply.send({
        code: 200,
        status: "success",
        getData: getData,
      });
    } else {
      return `user Not Found With Id ${id}`;
    }
  } catch (error) {
    throw error;
  }
};
const updateStudentsById = async (request, reply) => {
  try {
    logger.info("Src > Controller > studentController > updateStudentsById");
    const id = request.params.id;
    const data = request.body;
    const update = await updateData(data, id);
    console.log("data in Controller", update, "With id", id);
    if (update) {
      reply.send({
        code: 200,
        status: "success",
        data: update,
      });
    } else {
      return `User Not Found With id ${id}`;
    }
  } catch (error) {
    throw error;
  }
};

const deleteStudentsById = async (request, reply) => {
  try {
    logger.info("Src > controller  > studentController > deleteStudentsById");
    const id = request.params.id;
    const data = await studentDeletebyId(id);
    if (data) {
      reply.send({
        code: 200,
        status: "success",
        data: data,
      });
    }
  } catch (error) {
    return error;
  }
};

const loginStudent = async (request, reply) => {
  try {
    logger.info('src > controller > studentController > loginStudent')
    let payload = {
      password: request.body.password,
      userName: request.body.userName,
    };
    console.log("Payload", payload);
    const { error } = loginValidation.validate(payload);
    if (error) {
      return reply.code(400).send({ error: error.details[0].message });
    }
    const data = await studentLogin(payload);
    if (data) {
      reply.code(200).send({
        code: 200,
        data: data,
      });
    } else {
      reply.code(400).send({
        code: 400,
        error: "Failed to login",
      });
    }
  } catch (error) {
    logger.error("Error occurred during login:", error);
    throw error;
  }
};
module.exports = {
  StudentSignup,
  allStudents,
  getStudentsById,
  updateStudentsById,
  deleteStudentsById,
  loginStudent,
};
