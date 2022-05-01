const inquirer = require('inquirer');
const db = require('./config/connection');
const cTable = require('console.table');

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  promptUser();
});

// prompt user with menu after application connects
const promptUser = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'menu',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role'
      ]
    }
  ])
    // begin switch/case
    .then(function(res){
      switch (res.menu) {
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add a Department':
          addDepartment();
          break;
        case 'Add a Role':
          addRole();
          break;
        case 'Add an Employee':
          addEmployee();
          break;
        case 'Update an Employee Role':
          updateEmployeeRole();
          break;
      }
    })
};

// View all departments
const viewAllDepartments = () => {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  })
};

// View all roles
const viewAllRoles = () => {
  const sql = `SELECT role.*, department.name
              AS department_id
              FROM role
              LEFT JOIN department
              ON role.department_id = department.id`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  })
};

// View all employees
const viewAllEmployees = () => {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  })
};

// Add Department
const addDepartment = () => {
  console.log(`Here is where you will add a Department.`)
};

// Add Role
const addRole = () => {
  console.log(`Here is where you will add a Role.`)
};

// Add Employee
const addEmployee = () => {
  console.log(`Here is where you will add an Employee.`)
};

// Update Employee Role
const updateEmployeeRole = () => {
  console.log(`Here is where you will update an employee!`)
};

// NOTE TO SELF:
// FINISH WRITING DB QUERIES