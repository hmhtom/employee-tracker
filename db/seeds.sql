USE employee_db

INSERT INTO department (name)
VALUES ("Finance"),
       ("IT"),
       ("Human Resource");

INSERT INTO role (title, salary, department_id)
VALUES ("Chief Finance Officer", 100000.00, 1),
       ("Finance Manager", 90000.00, 1),
       ("Finance Assistance", 80000.00, 1),
       ("IT Manager", 100000.00, 2),
       ("Senior Developer", 90000.00, 2),
       ("Junior Developer", 80000.00, 2),
       ("Human Resource Manager", 100000.00, 3),
       ("Human Resource Specialist", 90000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Louis", "Careman", 1, NULL),
       ("David", "Howes", 2, 1),
       ("Karen", "Nal", 3, 1),
       ("Alan", "Chris", 4, NULL),
       ("Canyon", "Lost", 5, 4),
       ("Forest", "Side", 6, 4),
       ("Mark", "Low", 7, NULL),
       ("Jul", "Isral", 8, 7);
