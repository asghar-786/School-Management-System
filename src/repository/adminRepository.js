const dataSource = require("../Infrastructure/psql");
const userRepository = dataSource.getRepository("authentication");
const { logger } = require("../../logger");

const SignUpAdmins = async (userData) => {
  try {
    const data = await userRepository.create(userData);
    logger.info("src > repository > authRepository > SignUpAdmins", data);
    console.log("Repository Data ", data);
    const result = await userRepository.save(userData);
    console.log("Save Admin Signup", result);
    return result;
  } catch (error) {
    throw error;
  }
};


const findAdmin = async (email,userName) => {
  try {
    const student = await userRepository.findOne({ where: { email ,userName } });
    if (student) {
      return student ? student:null;
    } 
  } catch (err) {
    throw err;
  }
};
module.exports = { SignUpAdmins, findAdmin };
