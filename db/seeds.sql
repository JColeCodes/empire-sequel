INSERT INTO departments (name)
VALUES
    ('Frontend'),
    ('Backend'),
    ('Graphics'),
    ('UX / UI'),
    ('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('HTML Developer', 66, 1),
    ('CSS Developer', 66, 1),
    ('Javascript Developer', 72, 1),
    ('Junior Developer', 90, 2),
    ('Senior Developer', 120, 2),
    ('Static Graphics', 48, 3),
    ('Video Graphics', 80, 3),
    ('User Experience Designer', 66, 4),
    ('Social Media Manager', 54, 5),
    ('Customer Feedback', 54, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Penny', 'Adiyodi', 1, NULL),
    ('Josh', 'Hoberman', 1, NULL),
    ('Eliot', 'Waugh', 2, NULL),
    ('Margo', 'Hanson', 2, NULL),
    ('Alice', 'Quinn', 3, NULL),
    ('Quentin', 'Coldwater', 3, 5),
    ('Julia', 'Wicker', 3, NULL),
    ('Kady', 'Orloff-Diaz', 3, 7),
    ('Peter', 'Parker', 4, 12),
    ('Scott', 'Lang', 4, 13),
    ('James Buchanan', 'Barnes', 4, 13),
    ('Stephen', 'Strange', 5, NULL),
    ('Wanda', 'Maximoff', 5, NULL),
    ('Deandra', 'Reynolds', 6, NULL),
    ('Dennis', 'Reynolds', 7, NULL),
    ('Frank', 'Reynolds', 7, 15),
    ('Ronnie', 'McDonald', 8, NULL),
    ('Charlie', 'Kelly', 8, 17),
    ('Elizabeth', 'Swann', 9, NULL),
    ('Jack', 'Sparrow', 10, NULL);