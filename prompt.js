const inquirer = require("inquirer");
const {
  viewDepartment,
  getDepartmentList,
  addDepartment,
} = require("./sql/department");
const { viewRole, getRoleList, addRole } = require("./sql/role");
const {
  viewEmployee,
  getEmployeeList,
  addEmployee,
  updateEmployee,
} = require("./sql/employee");

//Main menu prompt
const menuPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuSelection",
        message: "What would you like to do?",
        choices: [
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
    .then(async (answer) => {
      switch (answer.menuSelection) {
        case "View All Employees":
          await viewEmployee();
          menuPrompt();
          break;
        case "Add Employee":
          addEmployeePrompt(await getRoleList(), await getEmployeeList());
          break;
        case "Update Employee Role":
          updateEmployeePrompt(await getRoleList(), await getEmployeeList());
          break;
        case "View All Roles":
          await viewRole();
          menuPrompt();
          break;
        case "Add Role":
          addRolePrompt(await getDepartmentList());
          break;
        case "View All Departments":
          await viewDepartment();
          menuPrompt();
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
    .then(async (result) => {
      await addEmployee(
        result.firstName,
        result.lastName,
        result.role,
        result.manager
      );
      menuPrompt();
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
    .then(async (result) => {
      await addRole(result.name, result.salary, result.department);
      menuPrompt();
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
    .then(async (result) => {
      await addDepartment(result.name);
      menuPrompt();
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
    .then(async (result) => {
      await updateEmployee(result.role, result.name);
      menuPrompt();
    });
};

module.exports = menuPrompt;
