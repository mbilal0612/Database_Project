const mysql = require("mysql");
const connection = mysql.createConnection({ host: "localhost", user:"root",  password: 'Password1!',database: 'schooldb'});

const connectDB = function () {
  connection.connect((err) => {
    if (err) {
      console.error("error connecting to db: " + err.stack);
    } else {
      console.log("DB connected");
    }
  });
};
module.exports = {
    connectDB,
    connection
}