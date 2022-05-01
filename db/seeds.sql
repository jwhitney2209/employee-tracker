INSERT INTO department
(name) 
VALUES
('Engineer'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO role
(title, salary, department_id)
VALUES
('Sales Lead', 3000, 4),
('Salesperson', 3000, 4),
('Lead Engineer', 3000, 1),
('Software Engineer', 3000, 1),
('Account Manager', 1000, 2),
('Accountant', 1000, 2),
('Legal Team Lead', 2000, 3),
('Lawyer', 2000, 3);

INSERT INTO employees
(first_name, last_name, role_id, manager_id)
VALUES
('Jackie', 'Estrella', 1, null),
('Ashley', 'Barragan', 2, 1),
('Erasmo', 'Martinez', 3, null),
('Frank', 'Quintero', 4, 3),
('Janice', 'Maldonado', 5, null),
('Victor', 'Gonzalez', 6, 5),
('David', 'Hernandez', 7, null),
('Carolina', 'Chavez', 8, 7);
