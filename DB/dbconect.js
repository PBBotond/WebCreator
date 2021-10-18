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
  getUserByEmail(email) {
    return new Promise((resolve) => {
      var temp = {};
      this.server.query(
        'SELECT * from userauthdata where userMail = "' + email + '"',
        (error, results, fields) => {
          temp = handler(error, results, fields);
          console.log(temp);
          if (temp.length > 0) {
            temp = temp[0];
            temp.status = "OK";
          } else {
            temp = { status: "NotFound" };
          }
          console.log(temp);
          resolve(temp);
        }
      );
    });
  }
  regNewUser(dataLine) {
    return new Promise((resolve) => {
      var temp = {};
      this.server.query(
        'INSERT INTO userauthdata (userName,userMail,userPass,userSource) VALUES ("' +
          dataLine.name +
          '", "' +
          dataLine.email +
          '", "' +
          dataLine.password +
          '", "' +
          dataLine.source +
          '")',
        (error, results, fields) => {
          temp = handler(error, results, fields);
          if (temp.message === "") {
            temp = { status: "OK" };
          }
          resolve(temp);
        }
      );
    });
  }
  setFreshToken(mail, token) {
    return new Promise((resolve) => {
      var temp = {};
      const actualDate = new Date().toISOString();
      this.server.query(
        'UPDATE logintable SET LastLoginDtu = "' +
          actualDate +
          '", userLastToken = "' +
          token +
          '" WHERE userMail = "' +
          mail +
          '"',
        (error, results, fields) => {
          temp = handler(error, results, fields);
          console.log("Update");
          console.log(temp);
          if (temp.changedRows === 1) {
            temp = { status: "OK" };
          }
          resolve(temp);
        }
      );
    });
  }
  setToken(mail, token) {
    return new Promise((resolve) => {
      var temp = {};
      const actualDate = new Date().toISOString();
      this.server.query(
        'INSERT INTO logintable (userMail,LastLoginDtu,userLastToken) VALUES ("' +
          mail +
          '", "' +
          actualDate +
          '", "' +
          token +
          '")',
        (error, results, fields) => {
          temp = handler(error, results, fields);
          console.log("Insert Token");
          console.log(temp);
          if (temp.message === "") {
            temp = { status: "OK" };
          }
          resolve(temp);
        }
      );
    });
  }
  delToken(mail) {
    return new Promise((resolve) => {
      var temp = {};
      const actualDate = new Date().toISOString();
      this.server.query(
        'UPDATE logintable SET LastLoginDtu = "' +
          actualDate +
          '", userLastToken = "' +
          "" +
          '" WHERE userMail = "' +
          mail +
          '"',
        (error, results, fields) => {
          temp = handler(error, results, fields);
          console.log("Update");
          console.log(temp);
          if (temp.changedRows === 1) {
            temp = { status: "OK" };
          }
          resolve(temp);
        }
      );
    });
  }
}
module.exports = dbconect;
