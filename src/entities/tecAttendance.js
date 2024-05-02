const { date } = require("joi");
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "teacherAttendance",
  tableName: "teacherAttendance",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    tecUserName:{
      type:"varchar",
      nullable:false
    },
    status: {
      type: "varchar",

    },
    date:{
        type:"date"
    }
  
  },
});
