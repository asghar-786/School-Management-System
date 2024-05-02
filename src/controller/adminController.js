const {
  adminSigUp,
  adminLogin,
  createAdminAfterVerification,
} = require("../service/adminService");
const { redisClient } = require("../Infrastructure/redis");
const { logger } = require("../../logger");
const { ValidateAdmin, loginValidation } = require("../schema/adminSchema");

const signUpAdmin = async (request, reply) => {
  try {
    logger.info("src > controller > authController > signupAdmin");
    const userData = request.body;
    console.log("Admin in Controller", userData);

    const { error } = ValidateAdmin.validate(request.body);
    console.log("Validate Error ", error);
    if (error) {
      return reply.code(400).send({ error: error.details[0].message });
    }
    const data = await adminSigUp(userData);
    if (data) {
      reply.code(200).send({
        message:
          "Verification email sent successfully. Please check your email for verification instructions.",
      });
    } else {
      throw new Error("Failed to signup Admin");
    }
  } catch (error) {
    logger.error("Error occurred during signup:", error);
    throw error;
  }
};

const loginAdmin = async (request, reply) => {
  try {
    let payload = {
      email: request.body.email,
      password: request.body.password,
      userName: request.body.userName,
    };
    const { error } = loginValidation.validate(payload);
    if (error) {
      return reply.code(400).send({ error: error.details[0].message });
    }
    const data = await adminLogin(payload);
    if (data) {
      reply.code(200).send({
        code: 200,
        status: "Login Success",
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

const verifyEmail = async (request, reply) => {
  try {
    const { email, verificationToken } = request.query;
    console.log("Verify Email");
    console.log("Email", email);
    console.log("VerificationToken", verificationToken);

    const storedToken = await redisClient.get(verificationToken, email);
    console.log("StoredToken", storedToken);

    if (storedToken === email) {
      await createAdminAfterVerification(verificationToken);
      await redisClient.del(verificationToken, email);

      reply.code(200).send({
        message: "Email verified successfully",
      });
    } else {
      reply.code(400).send({
        error: "Verification link expired or invalid",
      });
    }
  } catch (error) {
    logger.error("Error occurred during email verification:", error);
    throw error;
  }
};

module.exports = { signUpAdmin, loginAdmin, verifyEmail };
