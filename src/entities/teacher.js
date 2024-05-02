const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "teacher",
  tableName: "teacher",
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
    profession: {
      type: "varchar",
      nullable: false,
    },
    experience:{
      type:"int",
    },
    salary:{
    type:"bigint"
    }
  },
});
