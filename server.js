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
        viewAllDepartments();
        break;
      }
    })
};

const viewAllDepartments = () => {
  console.log(`Department Info Here`)
};
const viewAllRoles = () => {
  console.log(`Roles Info Here`)
};
const viewAllEmployees = () => {
  console.log(`Employee Info Here`)
};
const addDepartment = () => {
  console.log(`Here is where you will add a Department.`)
};
const addRole = () => {
  console.log(`Here is where you will add a Role.`)

};
const addEmployee = () => {
  console.log(`Here is where you will add an Employee.`)

};
const updateEmployee = () => {
  console.log(`Here is where you will update an employee!`)
};

