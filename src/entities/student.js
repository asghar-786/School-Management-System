const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "students",
  tableName: "students",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
      nullable: false,
    },
    userName:{
      type:"varchar",
      nullable:false
    },
    email: {
      type: "varchar",

    },
    password: {
      type: "varchar",
    },
    class: {
      type: "varchar",
      nullable: false,
    },
    fees:{
      type:"int",
    }
  },
});
