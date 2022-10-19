//Query Document contains all the queries for CRUD in main application

//Get all employee from employee table
//role_id will be subsitude with role name
//manager_id will be subsitude with manager name
const getAllEmployee = `SELECT 
employee.id, 
employee.first_name AS "First Name", 
employee.last_name AS "Last Name", 
role.title AS "Job Title", 
department.name AS "Department", 
role.salary AS "Salary", 
concat(manager.first_name, " ", manager.last_name) AS "Manager"
FROM employee
LEFT JOIN employee AS manager ON employee.manager_id = manager.id
JOIN role ON employee.role_id = role.id
JOIN department on department_id = department.id
ORDER BY role.title`;

//Add employee to employee table with firstname, lastname, rolename and manager name
const addEmployee = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES (
?, 
?, 
(SELECT id FROM role WHERE title = ?),
(SELECT id FROM employee AS manager WHERE concat(first_name," ",last_name) = ?) 
)`;

//Get all roles from role table
const getAllRole = `SELECT id,title AS Title,salary as Salary FROM role`;

//Get all department from department table
const getAllDepartment = `SELECT id, name AS Department FROM department`;

//add new role to role table with title, salary and department name
const addRole = `INSERT INTO role (title, salary, department_id)
VALUES (
  ?,
  ?,
  (SELECT id FROM department WHERE name = ?)
)`;

//Insert new department to department table
const addDepartment = `INSERT INTO department(name) VALUES (?)`;

//update employee's role given role name and employee full name
const updateEmployee = `UPDATE employee SET role_id = (SELECT id FROM role WHERE title = ?) WHERE concat(first_name," ",last_name) = ?`;

module.exports = {
  getAllEmployee,
  addEmployee,
  getAllRole,
  getAllDepartment,
  addRole,
  addDepartment,
  updateEmployee,
};
