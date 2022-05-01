const inquirer = require('inquirer');
const db = require('./config/connection');
const cTable = require('console.table');
const { response } = require('express');

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
    .then(function (res) {
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
  const sql = `SELECT 
                E.id,
                E.first_name, 
                E.last_name, 
                role.title, 
                department.name AS department, 
                role.salary,
              CONCAT(M.first_name,' ',M.last_name) AS manager
              FROM employees E
              JOIN role ON E.role_id = role.id
              JOIN department ON role.department_id = department.id
              LEFT JOIN employees M ON E.manager_id = M.id;
              `;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  })
};

// Add Department
const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'Please input a NEW department name:',
      validate: department => {
        if (department) {
          return true;
        } else {
          console.log('Please enter a department name!');
          return false;
        }
      },
    }
  ])
    .then((res) => {
      let sql = `INSERT INTO department (name) VALUES (?)`;
      db.query(sql, res.department, (err, results) => {
        if (err) throw err;
        console.log(`${res.department} has been successfully created!`);
        viewAllDepartments();
      });
    });
};

// Add Role
const addRole = () => {
  // First Ask: What department with this role will be in?
  const sql = 'SELECT * FROM department';

  db.query(sql, (err, results) => {
    let departmentArr = [];
    if (err) throw err;
    results.forEach((department) => {
      departmentArr.push(department.name);
    });
    inquirer.prompt([
      {
        type: 'list',
        name: 'departmentName',
        message: 'What department will this role be in?',
        choices: departmentArr
      }
    ])
      .then((res) => {
        addRoleInfo(res);
      });

      // Then Ask: What is the job title? What is the salary?
      const addRoleInfo = (departmentName) => {
        inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Please input a NEW job title:',
            validate: title => {
              if (title) {
                return true;
              } else {
                console.log('Please enter a job title name!');
                return false;
              }
            },
          },
          {
            type: 'input',
            name: 'salary',
            message: 'What will the salary be for this position? ',
            validate: salary => {
              if (salary) {
                return true;
              } else {
                console.log('Please enter a salary amount!');
                return false;
              }
            },
          }
        ])
        .then((res) => {
          let departmentName;
      
          results.forEach((department) => {
            departmentName = department.id;
          });

          let data = [res.title, res.salary, departmentName]
          let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

          db.query(sql, data, (err, results) => {
            if (err) throw err;
            console.log(`${res.title} has been successfully created!`);
            viewAllRoles();
          });
        });
      };
  });
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