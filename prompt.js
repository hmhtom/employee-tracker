const inquirer = require("inquirer");
const mysql2 = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();
const {
  getAllEmployee,
  addEmployee,
  getAllRole,
  getAllDepartment,
  addRole,
  addDepartment,
  updateEmployee,
} = require("./query");

//Define connection information
//.env file is needed
const connection = mysql2.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "employee_db",
});

//Main menu prompt
const menuPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuSelection",
        message: "What would you like to do?",
        choices: [
          new inquirer.Separator(),
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.menuSelection) {
        case "View All Employees":
          viewEmployee();
          break;
        case "Add Employee":
          //Passing role.title and employee full name as list into addEmployeePrompt()
          connection.query(`SELECT title FROM role`, (err, results) => {
            const titleList = results.map((result) => result.title);
            connection.query(
              `SELECT concat(first_name," ",last_name) AS name FROM employee`,
              (err, results) => {
                const employeeList = results.map((result) => result.name);
                addEmployeePrompt(titleList, employeeList);
              }
            );
          });
          break;
        case "Update Employee Role":
          //Passing role.title and employee full name as list into updateEmployeePrompt()
          connection.query(`SELECT title FROM role`, (err, results) => {
            const titleList = results.map((result) => result.title);
            connection.query(
              `SELECT concat(first_name," ",last_name) AS name FROM employee`,
              (err, results) => {
                const employeeList = results.map((result) => result.name);
                updateEmployeePrompt(titleList, employeeList);
              }
            );
          });
          break;
        case "View All Roles":
          viewRole();
          break;
        case "Add Role":
          //Passing department.name as list into addRolePrompt()
          connection.query(`SELECT name FROM department`, (err, results) => {
            const departmentList = results.map((result) => result.name);
            addRolePrompt(departmentList);
          });
          break;
        case "View All Departments":
          viewDepartment();
          break;
        case "Add Department":
          addDepartmentPrompt();
          break;
        case "Exit":
          console.log("Program Exits");
          process.exit();
      }
    });
};

//Print all employee using query into console table
const viewEmployee = () => {
  connection.query(getAllEmployee, (error, result) => {
    if (error) {
      console.log(error);
      menuPrompt();
    } else {
      console.table(result);
      menuPrompt();
    }
  });
};

//Print all role using query into console table
const viewRole = () => {
  connection.query(getAllRole, (error, result) => {
    if (error) {
      console.log(error);
      menuPrompt();
    } else {
      console.table(result);
      menuPrompt();
    }
  });
};

//Print all department using query into console table
const viewDepartment = () => {
  connection.query(getAllDepartment, (error, result) => {
    if (error) {
      console.log(error);
      menuPrompt();
    } else {
      console.table(result);
      menuPrompt();
    }
  });
};

//Prompts to add employee then insert data into database using query
const addEmployeePrompt = (titleList, employeeList) => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Please enter employee's first name: ",
      },
      {
        type: "input",
        name: "lastName",
        message: "Please enter employee's last name: ",
      },
      {
        type: "list",
        name: "role",
        message: "Please select employee's title: ",
        choices: titleList,
      },
      {
        type: "list",
        name: "manager",
        message: "Please select employee's manager: ",
        choices: employeeList,
      },
    ])
    .then((result) => {
      connection.query(
        addEmployee,
        [result.firstName, result.lastName, result.role, result.manager],
        (error) => {
          if (error) {
            console.log(`\nSQL ERROR: ${error.message}\n`);
            menuPrompt();
          } else {
            console.log(
              `\n${result.firstName} ${result.lastName} added to database.\n`
            );
            menuPrompt();
          }
        }
      );
    });
};

//Promot to add role then insert data into database using query
const addRolePrompt = (departmentList) => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter the name of the role: ",
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter the salary of the role: ",
      },
      {
        type: "list",
        name: "department",
        message: "Please select the department which the role belongs to: ",
        choices: departmentList,
      },
    ])
    .then((result) => {
      connection.query(
        addRole,
        [result.name, parseInt(result.salary), result.department],
        (error) => {
          if (error) {
            console.log(`\nSQL ERROR: ${error.message}\n`);
            menuPrompt();
          } else {
            console.log(`\nNew Role ${result.name} added to database.\n`);
            menuPrompt();
          }
        }
      );
    });
};

//Prompt to add department then insert data into database using query
const addDepartmentPrompt = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter the department name: ",
      },
    ])
    .then((result) => {
      connection.query(addDepartment, [result.name], (error) => {
        if (error) {
          console.log(`\nSQL ERROR: ${error.message}\n`);
          menuPrompt();
        } else {
          console.log(`\n${result.name} Department added to database.\n`);
          menuPrompt();
        }
      });
    });
};

//Prompt to update Employee then then insert data into database using query
const updateEmployeePrompt = (titleList, employeeList) => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "name",
        message: "Please select the employee which you want to update: ",
        choices: employeeList,
      },
      {
        type: "list",
        name: "role",
        message: "Please select the new role of the employee: ",
        choices: titleList,
      },
    ])
    .then((result) => {
      connection.query(updateEmployee, [result.role, result.name], (error) => {
        if (error) {
          console.log(`\nSQL ERROR: ${error.message}\n`);
          menuPrompt();
        } else {
          console.log(`\nUpdated ${result.name}'s role to ${result.role}.\n`);
          menuPrompt();
        }
      });
    });
};

module.exports = menuPrompt;
