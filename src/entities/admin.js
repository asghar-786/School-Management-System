const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "authentication",
  tableName: "admin-Authentication",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,  
    },
    userName: {
      type: "varchar",
      nullable: false,
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
  },
});
