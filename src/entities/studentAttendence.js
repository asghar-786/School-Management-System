const { date } = require("joi");
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "studentAttendance",
  tableName: "studentAttendance",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    stdUserName:{
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
