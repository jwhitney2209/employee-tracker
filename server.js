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
    .then(function(res){
      switch (res.menu) {
        case 'View All Departments':

      }
    })
};

const viewAllDepartments = () => {};
const viewAllRoles = () => {};
const viewAllEmployees = () => {};
const addDepartment = () => {};
const addRole = () => {};
const addEmployee = () => {};
const updateEmployee = () => {};

