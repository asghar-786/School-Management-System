const { errorCodes } = require("fastify");
const { logger } = require("../../logger");
const dataSource = require("../Infrastructure/psql");
const userRepository = dataSource.getRepository("students");

const StudentRepo = async (userData) => {
  try {
    logger.info(["src > repository > studentRepository > StudentRepo", userData]);
    const studentCreate = userRepository.create(userData);
    console.log("Student Data Create ",studentCreate)
    const result = await userRepository.save(userData);
    logger.info("Student created successfully", result);
    console.log("REPO", result);
    return result;
  } catch (error) {
    logger.error("Error while creating user:", error);
    throw error;
  }
};
const getAllData = async () => {
  try {
    logger.info("src > repository > studentRepository > getAllData");
    const allData = userRepository.find();
    return allData;
  } catch (error) {
    return error;
  }
};

const getDataById = async (id) => {
  try {
    logger.info("src > repository > studentRepository > getDataById");
    const Data = userRepository.findOne({ where: { id } });
    if (Data) {
      console.log("Repo", Data);
      return Data;
    } else {
      return "Student Not Exist With This Id";
    }
  } catch (error) {
    return error;
  }
};

const updateStudentsById = async (data, id) => {
  try {
    logger.info("Src > Repository > studentRepository > updateStudentsById");
    const studentData = await userRepository.findOne({ where: { id: id } });
    console.log("Data in repository", studentData, "with id", id);

    if (studentData) {
      Object.assign(studentData, data);

      const result = await userRepository.save(studentData);
      console.log("Data Updated", result);
      return result;
    } else {
      console.log(`No data found with id ${id}`);
      return null;
    }
  } catch (error) {
    console.error("Error in updateStudentsById:", error);
    throw error;
  }
};

const deleteStudent = async (id) => {
  try {
    logger.info("Src > Repository > studentRepository > deleteStudent");
    const existingStudent = await userRepository.findOne({ where: { id: id } });
    if (existingStudent) {
      const delstudent = await userRepository.remove(existingStudent);
      return `Data Deleted Successfully with id ${id}`;
    } else {
      return `user not found With id ${id}`;
    }
  } catch (error) {}
};

const getDataByUserName = async (userName) => {
  try {
    logger.info("src > repository > studentRepository > getDataByUserName");
    const data = await userRepository.findOne({ where: { userName } });
    console.log("Student Data in Repo", data);
    if (data) {
      return data;
    }
  } catch (error) {
    throw error;
  }
};
const StdLogin = async (payload) => {
  try {
    logger.info("src > repository > studentRepository > StdLogin");

    const { userName, password } = payload;

    console.log("UserName in Repo", userName);
    console.log("Password in Repo", password);
    const existingStudent = await getDataByUserName(userName);
    console.log("Existing Student", existingStudent);

    if (!existingStudent) {
      throw new Error("Student not registered yet");
    } else {
      if (
        userName == existingStudent.userName &&
        password === existingStudent.password
      ) {
        return "Login Success";
      } else {
        return "Invalid username or password";
      }
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  StudentRepo,
  getAllData,
  getDataById,
  updateStudentsById,
  deleteStudent,
  getDataByUserName,
  StdLogin,
};
