const fastify = require("fastify");
const dotenv = require("dotenv");
dotenv.config();
const dataSource = require("../src/Infrastructure/psql");
const { logger } = require("../logger");

const studentRoutes = require("./routes/studentRoute");
const adminRoute = require("./routes/admin");
const teacherRoute = require("./routes/teacherRoute");
const studentAttendanceRoute = require("./routes/stdAttendanceRoute");
const stdPayFeesRoute = require("./routes/stdPayFeesRoute");
const tecAttendanceRoute = require("./routes/tecAttendanceRoute");
const tecSalaryRoute = require("./routes/tecSalaryRoute");

const StartServer = async () => {
  const app = fastify();

  app.get("/", async (req, res) => {
    const result = {
      code: 200,
      status: "OK",
      message: "Fastify server is running ",
    };
    res.send(result);
  });
  app.register(studentRoutes);
  app.register(adminRoute);
  app.register(teacherRoute);
  app.register(studentAttendanceRoute);
  app.register(stdPayFeesRoute);
  app.register(tecAttendanceRoute);
  app.register(tecSalaryRoute);

  try {
    app.listen(process.env.PORT || 4000);

    await dataSource.initialize();
    logger.info("Database connection has been established");

    logger.info(`Server is listening on ${process.env.PORT || 4000}`);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

module.exports = StartServer;
