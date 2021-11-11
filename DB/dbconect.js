const mysql = require("mysql");

function handler(error, results, fields) {
  if (error) throw error;
  console.log("Handler");
  return results;
}
async function SelectAll(server, table, filter = null, where = null) {
  var sqlCommand =
    filter == null
      ? "SELECT * from " + table
      : "SELECT * from " + table + " where " + filter + ' = "' + where + '"';
  return new Promise((resolve) => {
    var temp = {};
    server.query(sqlCommand, (error, results, fields) => {
      temp = handler(error, results, fields);
      if (temp.length > 0) {
        if (temp.length == 1) {
          temp = temp[0];
        }
        temp.status = "OK";
        console.log(temp);
      } else {
        temp = { status: "NotFound" };
      }
      resolve(temp);
    });
  });
}
async function InsertInto(server, table, fields) {
  var sqlCommand = "INSERT INTO " + table + " SET ?";
  return new Promise((resolve) => {
    var temp = {};
    server.query(sqlCommand, fields, (error, results, fields) => {
      temp = handler(error, results, fields);
      if (temp.message === "") {
        temp = { status: "OK" };
      } else {
        temp = { status: "Error", message: temp.message };
      }
      resolve(temp);
    });
  });
}
async function Update(server, table, fields, filter) {
  var sqlCommand = "UPDATE " + table + " SET ? WHERE ?";
  return new Promise((resolve) => {
    server.query(sqlCommand, [fields, filter], (error, results, fields) => {
      var temp = handler(error, results, fields);
      if (temp.changedRows === 1) {
        temp = { status: "OK" };
      } else {
        temp = { status: "Error" };
      }
      resolve(temp);
    });
  });
}
class dbconect {
  constructor(connectionParams) {
    this.connectionParams = connectionParams;
    this.server = mysql.createConnection(connectionParams.connectionString);
  }
  getAll(table) {
    return SelectAll(this.server, table);
  }
  getById(id) {
    return SelectAll(this.server, "logintable", "id", id);
  }
  async getUserByEmail(email) {
    return await SelectAll(this.server, "userauthdata", "userMail", email);
  }
  async regNewUser(dataLine) {
    return await InsertInto(this.server, "userauthdata", {
      userName: dataLine.name,
      userMail: dataLine.email,
      userPass: dataLine.password,
      userSource: dataLine.source,
    });
  }
  async setFreshToken(mail, token) {
    const LastLoginDtu = new Date().toISOString();
    return await Update(
      this.server,
      "logintable",
      { LastLoginDtu, userLastToken: token },
      { userMail: mail }
    );
  }
  async setToken(userMail, userLastToken) {
    var LastLoginDtu = new Date().toISOString();
    return await InsertInto(this.server, "logintable", {
      userMail,
      LastLoginDtu,
      userLastToken,
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
  async getFile(id) {
    return await SelectAll(this.server, "savedfiles", "id", id);
  }
  async saveNewFile(fileName, type, userId, filePath) {
    return await InsertInto(this.server, "savedfiles", {
      type,
      userId,
      fileName,
      filePath,
    });
  }
  async updateExistingFile(id, fields) {
    return await Update(this.server, "savedfiles", fields, { id });
  }
}
module.exports = dbconect;
