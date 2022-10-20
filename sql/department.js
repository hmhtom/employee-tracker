const mysql2 = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();
const { getAllDepartmentQuery, addDepartmentQuery } = require("./query");

//Define connection information
//.env file is needed
const connection = mysql2.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "employee_db",
});

//Print all department using query into console table
const viewDepartment = async () => {
  try {
    const [rows, fields] = await connection
      .promise()
      .query(getAllDepartmentQuery);
    console.table(rows);
  } catch (error) {
    console.log(error);
  }
};

//Return current department name as array
const getDepartmentList = async () => {
  try {
    const departments = await connection
      .promise()
      .query(`SELECT name FROM department`);
    return departments[0].map((department) => department.name);
  } catch (error) {
    console.log(error);
  }
};

const addDepartment = async (departmentName) => {
  try {
    await connection.promise().query(addDepartmentQuery, [departmentName]);
    console.log(`\n${departmentName} Department added to database.\n`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  viewDepartment,
  getDepartmentList,
  addDepartment,
};
