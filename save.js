.then((roleData) => {
  let roleRes = roleData.role;
  employeeRes.push(roleRes);
  let managerSql = `SELECT * FROM employee`;
  db.query(managerSql, (err, results) => {
    if (err) throw err;
    let managers = res.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "managers",
          message: "Select the employees manager:",
          choices: managers,
        },
      ])
      .then((managerResponse) => {
        let managerRes = managerResponse.manager;
        employeeRes.push(managerRes);
        let employeeSql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES (?, ?, ?, ?)`;
        db.query(employeeSql, employeeRes, (err, results) => {
          if (err) throw err;
          console.log("Employee creation successful!");
          promptUser();
        });
      });
  });
});