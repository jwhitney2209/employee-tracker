const inquirer = require("inquirer");
const db = require("./config/connection");
const cTable = require("console.table");
const { response } = require("express");

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  promptUser();
});

// prompt user with menu after application connects
const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
        ],
      },
    ])
    // begin switch/case
    .then(function (res) {
      switch (res.menu) {
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee Role":
          updateEmployeeRole();
          break;
      }
    });
};

// View all departments
const viewAllDepartments = () => {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
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
  });
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
  });
};

// Add Department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Please input a NEW department name:",
        validate: (department) => {
          if (department) {
            return true;
          } else {
            console.log("Please enter a department name!");
            return false;
          }
        },
      },
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
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Please input a NEW job title:",
        validate: (title) => {
          if (title) {
            return true;
          } else {
            console.log("Please enter a job title name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "What will the salary be for this position? ",
        validate: (salary) => {
          if (salary) {
            return true;
          } else {
            console.log("Please enter a salary amount!");
            return false;
          }
        },
      },
    ])
    .then((res) => {
      roleRes = [res.title, res.salary];
      let departmentSql = `SELECT * FROM department`;
      db.query(departmentSql, (err, res) => {
        if (err) throw err;
        let department = res.map(({ id, name }) => ({
          name: name,
          value: id,
        }));
        inquirer
          .prompt([
            {
              type: "list",
              name: "department",
              message: "Please select a department for this role:",
              choices: department,
            },
          ])
          .then((res) => {
            deptRes = res.department;
            roleRes.push(deptRes);
            let roleSql = `INSERT INTO role (title, salary, department_id)
                      VALUES (?, ?, ?)`;
            db.query(roleSql, roleRes, (err, results) => {
              if (err) throw err;
              console.log("Role creation successful!");
              promptUser();
            });
          });
      });
    });
};

// Add Employee
const addEmployee = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Employee First Name:",
        validate: (firstName) => {
          if (firstName) {
            return true;
          } else {
            console.log("Please enter a first name.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "Employee Last Name:",
        validate: (lastName) => {
          if (lastName) {
            return true;
          } else {
            console.log("Please enter a last name.");
            return false;
          }
        },
      },
    ])
    .then((res) => {
      // Take employee first and last name and store in employeeRes array
      const employeeRes = [res.firstName, res.lastName];

      db.query(`SELECT role.id, role.title FROM role`, (err, results) => {
        if (err) throw err;
        let role = results.map(({ id, title }) => ({ name: title, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "Please select a role for this employee:",
              choices: role,
            },
          ])
          .then((roleAnswer) => {
            let roleRes = roleAnswer.role;
            employeeRes.push(roleRes);

            //
            db.query(`SELECT * FROM employees`, (err, results) => {
              if (err) throw err;
              let manager = results.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
              }));
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Select the employees manager:",
                    choices: manager,
                  },
                ])
                // Insert Employee Info into employee table
                .then((managerAnswer) => {
                  let managerRes = managerAnswer.manager;
                  employeeRes.push(managerRes);

                  let employeeSql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                                VALUES (?, ?, ?, ?)`;

                  db.query(employeeSql, employeeRes, (err, results) => {
                    if (err) throw err;
                    console.log("Employee creation successful!");
                    promptUser();
                  });
                });
            });
          });
      });
    });
};

// Update Employee Role
const updateEmployeeRole = () => {
  const employeeSql = `SELECT * FROM employees`;

  db.query(employeeSql, (err, results) => {
    if (err) throw err;
    let employees = results.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    const roleSql = `SELECT role.id, role.title FROM role`;

    db.query(roleSql, (err, results) => {
      if (err) throw err;
      let role = results.map(({ id, title }) => ({
        name: title,
        value: id,
      }));
      inquirer.prompt([
        {
          type: 'list',
          name: 'name',
          message: 'Which employee would you like to update?',
          choices: employees,
        },
        {
          type: 'list',
          name: 'role',
          message: 'Which role would you like to change this employee to?',
          choices: role,
        },
      ])
      .then((response) => {
        updateRole = [response.name, response.role];
        
        let updateRoleSql = `UPDATE employees
                            SET employees.role_id = ?
                            WHERE employees.id = ?`;
        db.query(updateRoleSql, updateRole, (err, results) => {
          if (err) throw err;
          console.log("Employee Role Update successful!");
          promptUser();
        })
      })
    })
  })
};

