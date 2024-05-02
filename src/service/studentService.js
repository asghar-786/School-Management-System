const {
  StudentRepo,
  getAllData,
  getDataById,
  updateStudentsById,
  deleteStudent,
  getDataByUserName,
  StdLogin,
} = require("../repository/studentRepository");

const { logger } = require("../../logger");

const SignupStudent = async (userData) => {
  try {
    logger.info('src > service > studentService > signupStudent')
    const userName = userData.userName;
    const existingStudent = await getDataByUserName(userName);
    console.log("Existing Student by", existingStudent);

    if (existingStudent) {
      throw (error = "Student Already Registered");
    } else {
      const student = await StudentRepo(userData);
      return student;
    }
  } catch (error) {
    throw error;
  }
};

const getAllStudents = async () => {
  try {
    logger.info("src > service > studentService > getAllStudents");
    const allData = await getAllData();
    return allData;
  } catch (error) {
    console.log("Error in Service", error);
    return error;
  }
};

const dataById = async (id) => {
  try {
    logger.info("src > service > studentService > dataById");
    const data = await getDataById(id);
    console.log("Data in Service", data);
    return data;
  } catch (error) {
    throw error;
  }
};

const updateData = async (data, id) => {
  try {
    logger.info("Src >  service > studentService > updateData");
    const UpdatedData = await updateStudentsById(data, id);
    console.log("Data In Service", UpdatedData, "With id", id);
    return UpdatedData;
  } catch (error) {}
};
const studentDeletebyId = async (id) => {
  try {
    logger.info("Src > Service > studentService > deleteStudentsById");
    const data = await deleteStudent(id);
    return data;
  } catch (error) {}
};
const studentLogin = async (payload) => {
  try {
    logger.info("src > service > studentService > studentLogin ");
    const Data = await StdLogin(payload);
    console.log("Student Data in Service", Data);
    return Data;
  } catch (error) {
    logger.error("Error in studentLogin function: ", error);
    throw error;
  }
};

module.exports = {
  SignupStudent,
  getAllStudents,
  dataById,
  updateData,
  studentDeletebyId,
  studentLogin,
};
