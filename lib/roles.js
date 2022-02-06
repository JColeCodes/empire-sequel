const cTable = require('console.table');
const db = require('../db/connection');
const { getDepartmentInfo } = require('./departments');

// Get all roles
async function getRoles() {
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.name
                AS department_name
                FROM roles
                LEFT JOIN departments
                ON roles.department_id = departments.id
                ORDER BY roles.department_id`;
    return db.promise().query(sql)
    .then(([rows,fields]) => {
        console.table(rows);
        return rows;
    });
}

// Get list of roles for inquirer selection
async function getRoleInfo() {
    const sql = `SELECT roles.id, roles.title FROM roles`;
    return db.promise().query(sql)
    .then(([rows,fields]) => {
        var rolesArray = [];
        for (let i = 0; i < rows.length; i++) {
            rolesArray.push({ id: rows[i].id, title: rows[i].title });
        }
        return rolesArray;
    });
    
}

// Add new role
async function addRole(title, salary, department) {
    var depts = await getDepartmentInfo();
    var deptIds = [];
    var deptNames = [];
    for (var i = 0; i < depts.length; i++) {
        deptIds.push(depts[i].id);
        deptNames.push(depts[i].name);
    }
    var department_id = deptIds[deptNames.indexOf(department)];

    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    const params = [title, salary, department_id];
    return db.promise().query(sql, params)
    .then(([row,fields]) => {
        console.log(`A new role with the title "${title}" and salary of ${salary} was added with an ID of ${row.insertId} to department ${department}`);
        return row;
    });
}

// Update role
async function updateRole(id, column, input) {
    var col = '';
    if (column === 'Salary') {
        col = 'salary';
    } else if (column === 'Department') {
        col = 'department_id';
    }
    var sql = `UPDATE roles SET ${col} = ? WHERE id = ?`;
    var params = [input, id];
    return db.promise().query(sql, params)
    .then(([row,fields]) => {
        console.log(`The role with an ID of ${id} has had its ${col} updated to ${input}`);
        return row;
    });
}

// Delete role
async function deleteRole(id) {
    const sql = `DELETE FROM roles WHERE id = ?`;
    return db.promise().query(sql, id)
    .then(([row,fields]) => {
        console.log(`The role with an ID of ${id} has been deleted`);
        return row;
    });
}

module.exports = { getRoles, getRoleInfo, addRole, updateRole, deleteRole };