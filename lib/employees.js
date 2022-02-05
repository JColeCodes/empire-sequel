const cTable = require('console.table');
const db = require('../db/connection');
const { getRoleInfo } = require('./roles');

// Get all employees
async function getEmployees(sortType) {
    const sql = `SELECT
                    employee.id,
                    employee.first_name,
                    employee.last_name,
                    roles.title AS role_title,
                    departments.name AS department_name,
                    roles.salary AS salary,
                    CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager_name
                FROM employees AS employee LEFT JOIN employees AS mgr ON employee.manager_id = mgr.id
                LEFT JOIN roles ON employee.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                ORDER BY ${sortType}`;
    return db.promise().query(sql)
    .then(([rows,fields]) => {
        console.table(rows);
        return rows;
    });
}

// Add new employee
async function addEmployee(first_name, last_name, role, manager) {
    var manager_id = manager;
    if (manager === 'NaN') {
        manager_id = 'NULL';
    }
    var roles = await getRoleInfo();
    var roleIds = [];
    var roleTitles = [];
    for (var i = 0; i < roles.length; i++) {
        roleIds.push(roles[i].id);
        roleTitles.push(roles[i].title);
    }
    var role_id = roleIds[roleTitles.indexOf(role)];
    
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [first_name, last_name, role_id, manager_id];
    return db.promise().query(sql, params)
    .then(([row,fields]) => {
        console.log(`A new employee with the name "${first_name} ${last_name}" and role of ${role} was added with an ID of ${row.insertId}`);
        return row;
    });
}

// Update employee
async function updateEmployee(id, column, input) {
    var col = '';
    var newInput = input;
    if (column === 'Role') {
        col = 'role_id';
    } else if (column === 'Manager') {
        col = 'manager_id';
        if (input === 0) {
            newInput = 'NULL';
        }
    }
    var sql = `UPDATE roles SET ${col} = ? WHERE id = ?`;
    var params = [input, id];
    return db.promise().query(sql, params)
    .then(([row,fields]) => {
        console.log(`The role with an ID of ${id} has had its ${column.toLowercase()} ID updated to ${newInput}`);
        return row;
    });
}
// async function updateEmployee(id, title, salary, department) {
//     var sql = 'UPDATE roles SET ';
//     var params = [];
//     if (title !== '') {
//         sql += 'title = ?';
//         params.push(title);
//         if (salary != 'NaN' || department != 'NaN') {
//             sql += ', ';
//         } else { sql += ' ' }
//     }
//     if (salary != 'NaN') {
//         sql += 'salary = ?';
//         params.push(salary);
//         if (department != 'NaN') {
//             sql += ', ';
//         } else { sql += ' ' }
//     }
//     if (department != 'NaN') {
//         sql += 'department_id = ? ';
//         params.push(department);
//     }
//     sql += 'WHERE id = ?';
//     params.push(id);
//     return db.promise().query(sql, params)
//     .then(([row,fields]) => {
//         console.log(`The role with an ID of ${id} has been updated `);
//         return row;
//     });
// }

// Delete employee
async function deleteEmployee(id) {
    const sql = `DELETE FROM employees WHERE id = ?`;
    return db.promise().query(sql, id)
    .then(([row,fields]) => {
        console.log(`The employee with an ID of ${id} has been deleted`);
        return row;
    });
}

module.exports = { getEmployees, addEmployee, updateEmployee, deleteEmployee };