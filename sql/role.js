const mysql2 = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();
const { getAllRoleQuery, addRoleQuery } = require("./query");

//Define connection information
//.env file is needed
const connection = mysql2.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "employee_db",
});

//Print all role using query into console table
const viewRole = async () => {
  try {
    const [rows, fields] = await connection.promise().query(getAllRoleQuery);
    console.table(rows);
  } catch (error) {
    console.log(error);
  }
};

const getRoleList = async () => {
  try {
    const roles = await connection.promise().query(`SELECT title FROM role`);
    return roles[0].map((role) => role.title);
  } catch (error) {
    console.log(error);
  }
};

const addRole = async (roleTitle, roleSalary, roleDepartment) => {
  try {
    await connection
      .promise()
      .query(addRoleQuery, [roleTitle, parseInt(roleSalary), roleDepartment]);
    console.log(`\nNew Role ${roleTitle} added to database.\n`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  viewRole,
  addRole,
  getRoleList,
};
