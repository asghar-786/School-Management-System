const dataSource = require("../Infrastructure/psql");
const userRepository = dataSource.getRepository("teacher");
const {logger}=require('../../logger')
const tecSignUp = async (teachersData) => {
  try {
    logger.info("src > Repository > teacherRepository > tecSignUp");
    const data = await userRepository.create(teachersData);
    console.log("data in Tec Repo", data);
    const result = await userRepository.save(teachersData);
    console.log("Teacher in Repo", result);
    return result;
  } catch (error) {
    throw error;
  }
};

const findTeacher = async (teachersData) => {
  try {
    logger.info("src > Repository > teacherRepository > findTeacher");
    const userName = teachersData.userName;
    const existingTeacher = await userRepository.findOne({
      where: { userName },
    });
    console.log("UserName:", userName, "Existing Teacher:", existingTeacher);

    return existingTeacher;
  } catch (error) {
    throw error;
  }
};

const teacherLogin = async (payload) => {
  try {
    logger.info("src > Repository > teacherRepository > teacherLogin");
    const userName = payload.userName;
    const password = payload.password;
    console.log("Username", userName, "Password", password);
    const isExistingTeacher = await userRepository.findOne({
      where: { userName },
    });
    console.log("IsExistingTeacher", isExistingTeacher);
    if (!isExistingTeacher) {
      return "Teacher Not Registered With this UserName";
    } else {
      if (
        userName === isExistingTeacher.userName && password === isExistingTeacher.password) {
        return "Login Success";
      } else {
        return "Invalid UserName And Password";
      }
    }
  } catch (error) {
    throw error;
  }
};

const allTeachersData = async () => {
  try {
    logger.info("src > Repository > teacherRepository > allTeachersData");
    const teachersData = userRepository.find();
    return teachersData;
  } catch (error) {
    throw error;
  }
};
const getTeachersDataById = async (id) => {
  try {
    logger.info("src > Repository > teacherRepository > getTeachersDataById");
    const dataById = await userRepository.findOne({ where: { id } });
    if (dataById) {
      return dataById;
    } else {
      return "Teacher Not Found With This Id";
    }
  } catch (error) {
    throw error;
  }
};

const deleteTeachers = async (id) => {
  try {
    logger.info("src > Repository > teacherRepository > deleteTeachers");
    const isExistingTeacher = await userRepository.findOne({ where: { id } });
    if (isExistingTeacher) {
      const data = await userRepository.delete(id);
      return `Teacher Record Deleted with id ${id}`;
    } else {
      return "Teacher not Exist With This Id";
    }
  } catch (error) {
    throw error;
  }
};
const teacherUpdateById = async (id, data) => {
  try {
    logger.info("src > Repository > teacherRepository > teacherUpdateById");
    const teacherData = await userRepository.findOne({ where: { id: id } });
    console.log("Data in repository", teacherData, "with id", id);

    if (teacherData) {
      Object.assign(teacherData, data);

      const result = await userRepository.save(teacherData);
      console.log("Data Updated", result);
      return result;
    } else {
      console.log(`No data found with id ${id}`);
      return null;
    }
  } catch (error) {
    console.error("Error in teacherUpdateById:", error);
    throw error;
  }
};

const getTeacherByUserName = async (userName) => {
  try {
    logger.info("src > Repository > teacherRepository > getTeacherByUserName");
    console.log("userName in Tec", userName);
    const data = await userRepository.findOne({ where: { userName } });
    console.log("Tec Exiting by Username", data);
    if (data) {
      return data;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  tecSignUp,
  findTeacher,
  teacherLogin,
  allTeachersData,
  getTeachersDataById,
  deleteTeachers,
  teacherUpdateById,
  getTeacherByUserName,
};
