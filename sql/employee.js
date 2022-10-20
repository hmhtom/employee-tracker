const mysql2 = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();
const {
  getAllEmployeeQuery,
  addEmployeeQuery,
  getAllRoleQuery,
  getAllDepartmentQuery,
  addRoleQuery,
  addDepartmentQuery,
  updateEmployeeQuery,
} = require("./query");

//Define connection information
//.env file is needed
const connection = mysql2.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "employee_db",
});

//Print all employee using query into console table
const viewEmployee = async () => {
  try {
    const [rows, fields] = await connection
      .promise()
      .query(getAllEmployeeQuery);
    console.table(rows);
  } catch (error) {
    console.log(error);
  }
};

const getEmployeeList = async () => {
  try {
    const employees = await connection
      .promise()
      .query(`SELECT concat(first_name," ",last_name) AS name FROM employee`);
    return employees[0].map((employee) => employee.name);
  } catch (error) {
    console.log(error);
  }
};

const addEmployee = async (firstName, lastName, role, managerName) => {
  try {
    await connection
      .promise()
      .query(addEmployeeQuery, [firstName, lastName, role, managerName]);
    console.log(`\n${firstName} ${lastName} added to database.\n`);
  } catch (error) {
    console.log(error);
  }
};

const updateEmployee = async (role, name) => {
  try {
    await connection.promise().query(updateEmployeeQuery, [role, name]);
    console.log(`\nUpdated ${name}'s role to ${role}.\n`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  viewEmployee,
  getEmployeeList,
  addEmployee,
  updateEmployee,
};
