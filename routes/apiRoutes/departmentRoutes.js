const cTable = require('console.table');
const db = require('../../db/connection');

// Get all departments
async function getDepartments() {
    const sql = `SELECT * from departments`;
    return db.promise().query(sql)
    .then(([rows,fields]) => {
        console.log('All Departments:');
        console.table(rows);
        return rows;
    });
}

async function addDepartment(name) {
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    return db.promise().query(sql, name)
    .then(([row,fields]) => {
        //console.table(``, row);
        console.log(`A new department with the name "${name}" was added with an ID of ${row.insertId}`);
        return row;
    });
}

async function updateDepartment(id, name) {
    const sql = `UPDATE departments SET name = ? WHERE id = ?`;
    const params = [name, id];
    return db.promise().query(sql, params)
    .then(([row,fields]) => {
        //console.table(``, row);
        console.log(`The department with an ID of ${id} has been updated with a new name of "${name}"`);
        return row;
    });
}

async function deleteDepartment(id) {
    const sql = `DELETE FROM departments WHERE id = ?`;
    return db.promise().query(sql, id)
    .then(([row,fields]) => {
        //console.table(``, row);
        console.log(`The department with an ID of ${id} has been deleted`);
        return row;
    });
}

module.exports = { getDepartments, addDepartment, updateDepartment, deleteDepartment };