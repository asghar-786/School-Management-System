const { SignUpAdmins, findAdmin } = require("../repository/studentRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { logger } = require("../../logger");
const { redisClient } = require("../Infrastructure/redis");
const {sendVerificationEmail,verifyPassword} = require("../mediator/adminMediater");

const adminSigUp = async (adminData) => {
  try {
    logger.info("src > service > authService > adminSignUp");
    const { email } = adminData;
    logger.info("Email in Service: ", email);
    console.log("Email in Service", email);
    console.log("adminData in Service", adminData);

    const existingAdmin = await findAdmin(email);
    console.log("ExistingUser", existingAdmin);

    if (existingAdmin) {
      throw Error("Admin Already Exists With This Email");
    } else {
      const verificationToken = jwt.sign(adminData, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      console.log("VerificationToken", verificationToken);
      logger.info("Verification token generated: ", verificationToken);

      const saveResult = await redisClient.set(verificationToken, email);
      console.log("Saved Tokens", saveResult);
      logger.info("Verification token stored in Redis", saveResult);

      await sendVerificationEmail(verificationToken, email);
      logger.info("Verification email sent successfully");

      return {
        success: "Verification email sent successfully",
        token: verificationToken,
      };
    }
  } catch (error) {
    logger.error("Error in adminSigUp function: ", error.message || error);
    throw error;
  }
};

const createAdminAfterVerification = async (verificationToken) => {
  try {
    logger.info("src > service > authService > createAdminAfterVerification");
    const tokenData = jwt.decode(verificationToken, process.env.JWT_SECRET);
    console.log("TokensData", tokenData);
    const hashPassword = await bcrypt.hash(tokenData?.password, 10);
    console.log("HashPassword", hashPassword);

    const data = { ...tokenData, password: hashPassword };
    console.log("Data", data);

    const adminData = await SignUpAdmins(data);
    logger.info("Admin created after verification: ", adminData);

    return adminData;
  } catch (error) {
    logger.error("Error in createAdminAfterVerification function: ", error);
    throw error;
  }
};

const adminLogin = async (payload) => {
  try {
    logger.info("src > service > authService > adminLogin ");
    const { email, password, userName } = payload;
    console.log("Email in Payload", email);
    const existingStudent = await findAdmin(email, userName);
    if (!existingStudent) {
      throw new Error("Admin Not Registered Yet");
    } else {
      const passwordVerification = await verifyPassword(
        password,
        existingStudent
      );
      console.log("Password verification: ", passwordVerification);

      return passwordVerification;
    }
  } catch (error) {
    logger.error("Error in adminLogin function: ", error);
    throw error;
  }
};

module.exports = { adminSigUp, adminLogin, createAdminAfterVerification };
