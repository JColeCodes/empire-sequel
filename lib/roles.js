const cTable = require('console.table');
const db = require('../db/connection');

// Get all roles
async function getRoles() {
    const sql = `SELECT roles.*, departments.name
                AS department_name
                FROM roles
                LEFT JOIN departments
                ON roles.department_id = departments.id`;
    return db.promise().query(sql)
    .then(([rows,fields]) => {
        console.table(rows);
        return rows;
    });
}

// Add new role
async function addRole(title, salary, department) {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    const params = [title, salary, department];
    return db.promise().query(sql, params)
    .then(([row,fields]) => {
        console.log(`A new role with the title "${title}" and salary of ${salary} was added with an ID of ${row.insertId} to department ${department}`);
        return row;
    });
}

// Update role
async function updateRole(id, title, salary, department) {
    var sql = 'UPDATE roles SET ';
    var params = [];
    if (title !== '') {
        sql += 'title = ?';
        params.push(title);
        if (salary != 'NaN' || department != 'NaN') {
            sql += ', ';
        } else { sql += ' ' }
    }
    if (salary != 'NaN') {
        sql += 'salary = ?';
        params.push(salary);
        if (department != 'NaN') {
            sql += ', ';
        } else { sql += ' ' }
    }
    if (department != 'NaN') {
        sql += 'department_id = ? ';
        params.push(department);
    }
    sql += 'WHERE id = ?';
    params.push(id);
    return db.promise().query(sql, params)
    .then(([row,fields]) => {
        console.log(`The role with an ID of ${id} has been updated `);
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

module.exports = { getRoles, addRole, updateRole, deleteRole };