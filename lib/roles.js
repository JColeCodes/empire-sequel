const cTable = require('console.table');
const db = require('../db/connection');

// Get all roles
async function getRoles() {
    const sql = `SELECT * from roles`;
    return db.promise().query(sql)
    .then(([rows,fields]) => {
        console.table(rows);
        return rows;
    });
}

// Add new role
// async function addRole(name) {
//     const sql = `INSERT INTO departments (name) VALUES (?)`;
//     return db.promise().query(sql, name)
//     .then(([row,fields]) => {
//         //console.table(``, row);
//         console.log(`A new department with the name "${name}" was added with an ID of ${row.insertId}`);
//         return row;
//     });
// }

module.exports = { getRoles };