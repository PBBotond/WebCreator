const connectiondata = {
  connectionString: {
    host: "localhost",
    user: "client",
    database: "nextdb",
    port: 3306,
  },
  tables: ["test", "userData", "userFiles"],
};
/*
const config = {
  user: "root",
  password: "asdasdasd1",
  server: "127.0.0.1",
  database: "lararest",
  Options: {
    trustedConnection: true,
    enableArithPort: true,
    instancename: "mysql",
  },
  port: 3306,
};*/
module.exports = connectiondata;
