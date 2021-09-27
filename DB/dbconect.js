const mysql = require("mysql");

function handler(error, results, fields) {
  if (error) throw error;
  console.log("Handler");
  return results;
}

class dbconect {
  constructor(connectionParams) {
    this.connectionParams = connectionParams;
    this.server = mysql.createConnection(connectionParams.connectionString);
  }
  getAll(table) {
    return new Promise((resolve) => {
      var temp = {};
      this.server.query("SELECT * from " + table, (error, results, fields) => {
        temp = handler(error, results, fields);
        console.log(temp);
        resolve(temp);
      });
    });
  }
  getById(id) {
    return new Promise((resolve) => {
      var temp = {};
      this.server.query(
        "SELECT * from test where userid = " + id,
        (error, results, fields) => {
          temp = handler(error, results, fields);
          console.log(temp);
          resolve(temp);
        }
      );
    });
  }
}
module.exports = dbconect;
