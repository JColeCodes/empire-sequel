const cTable = require('console.table');
const db = require('../db/connection');

// Get all departments
async function getDepartments() {
    const sql = `SELECT departments.*, SUM(roles.salary) AS total_utilized_budget
                FROM departments
                LEFT JOIN roles ON departments.id = roles.department_id
                LEFT JOIN employees ON roles.id = employees.role_id
                GROUP BY departments.id`;
    return db.promise().query(sql)
    .then(([rows,fields]) => {
        console.table(rows);
        return rows;
    });
}

// Get list of departments for inquirer selection
async function getDepartmentInfo() {
    const sql = `SELECT departments.id, departments.name FROM departments`;
    return db.promise().query(sql)
    .then(([rows,fields]) => {
        var deptArray = [];
        for (let i = 0; i < rows.length; i++) {
            deptArray.push({ id: rows[i].id, name: rows[i].name });
        }
        return deptArray;
    });
    
}

// Add new department
async function addDepartment(name) {
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    return db.promise().query(sql, name)
    .then(([row,fields]) => {
        console.log(`A new department with the name "${name}" was added with an ID of ${row.insertId}`);
        return row;
    });
}

// Delete department
async function deleteDepartment(id) {
    const sql = `DELETE FROM departments WHERE id = ?`;
    return db.promise().query(sql, id)
    .then(([row,fields]) => {
        console.log(`The department with an ID of ${id} has been deleted`);
        return row;
    });
}

module.exports = { getDepartments, getDepartmentInfo, addDepartment, deleteDepartment };