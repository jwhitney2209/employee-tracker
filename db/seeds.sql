INSERT INTO department
(name) 
VALUES
('Section Leaders'),
('Voice Part'),
('Storage'),
('Stage');

INSERT INTO role
(title, salary, department_id)
VALUES
('Soprano Section Leader', 3000, 1),
('Alto Section Leader', 3000, 1),
('Tenor Section Leader', 3000, 1),
('Bass Section Leader', 3000, 1),
('Soprano', 1000, 2),
('Alto', 1000, 2),
('Tenor', 2000, 2),
('Bass', 2000, 2),
('Uniform Checker', 4000, 3),
('Uniform Cleaner', 6000, 3),
('Riser Crew', 6000, 4),
('Sound Crew', 7000, 4);

INSERT INTO employees
(first_name, last_name, role_id, manager_id)
VALUES
('Jackie', 'Estrella', 1, null),
('Ashley', 'Barragan', 2, null),
('Erasmo', 'Martinez', 3, null),
('Frank', 'Quintero', 4, null),
('Janice', 'Maldonado', 6, 1),
('Victor', 'Gonzalez', 7, 2),
('David', 'Hernandez', 5, 3),
('Carolina', 'Chavez', 8, 4),
('Christian', 'Quintero', 7, null),
('Anthony', 'Chavez', 9, null),
('Andrew', 'Rader', 10, null),
('Mia', 'Gracia', 11, null),
('Jesus', 'Guevara', 12, null),
('Melanie', 'Reyes', 12, null);