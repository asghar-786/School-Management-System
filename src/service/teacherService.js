const {
  tecSignUp,
  findTeacher,
  teacherLogin,
  allTeachersData,
  getTeachersDataById,
  deleteTeachers,
  teacherUpdateById,
} = require("../repository/teacherRepository");

const { logger } = require("../../logger");
const signUpTeacher = async (teachersData) => {
  try {
    logger.info("src > service > teacherService > signUpTeacher");
    const existTeacher = await findTeacher(teachersData);
    console.log("isExistingTeacher", existTeacher);

    if (existTeacher) {
      return "Teacher Already Exists With This UserName";
    } else {
      const data = await tecSignUp(teachersData);
      return data;
    }
  } catch (error) {
    throw error;
  }
};

const loginTeacher = async (Payload) => {
  try {
    logger.info("src > service > teacherService > loginTeacher");
    const data = await teacherLogin(Payload);
    console.log("Data in Service", data);
    return data;
  } catch (error) {
    throw error;
  }
};

const allTeachers = async () => {
  try {
    logger.info("src > service > teacherService > allTeachers");
    const allData = await allTeachersData();
    return allData;
  } catch (error) {
    throw error;
  }
};

const teachersById = async (id) => {
  try {
    logger.info("src > service > teacherService > teachersById");
    const data = await getTeachersDataById(id);
    return data;
  } catch (error) {
    throw error;
  }
};

const delTeacher = async (id) => {
  try {
    logger.info("src > service > teacherService > delTeacher");
    const data = await deleteTeachers(id);
    return data;
  } catch (error) {
    throw error;
  }
};

const teacherUpdate = async (id, teacherData) => {
  try {
    logger.info("src > service > teacherService > teacherUpdate");
    const data = await teacherUpdateById(id, teacherData);
    return data;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  signUpTeacher,
  loginTeacher,
  allTeachers,
  teachersById,
  delTeacher,
  teacherUpdate,
};
