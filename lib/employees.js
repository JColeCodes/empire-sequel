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
    var roles = await getRoleInfo();
    var roleIds = [];
    var roleTitles = [];
    for (var i = 0; i < roles.length; i++) {
        roleIds.push(roles[i].id);
        roleTitles.push(roles[i].title);
    }
    var role_id = roleIds[roleTitles.indexOf(role)];

    var sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    var params = [first_name, last_name, role_id, manager];

    if (manager === 'NaN') {
        sql = `INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)`;
        params = [first_name, last_name, role_id];
    }
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
    var sql = `UPDATE employees SET ${col} = ? WHERE id = ?`;
    var params = [newInput, id];
    return db.promise().query(sql, params)
    .then(([row,fields]) => {
        console.log(`The role with an ID of ${id} has had its ${column.toLowerCase()} ID updated to ${newInput}`);
        return row;
    });
}

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