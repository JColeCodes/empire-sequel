const inquirer = require('inquirer');
const { getDepartments, addDepartment, updateDepartment, deleteDepartment }  = require('../lib/departments');
const { getRoles, addRole, updateRole, deleteRole } = require('../lib/roles');

const askContinue = () => {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'ifContinue',
            message: 'Would you like to go back to the menu?',
            default: true
        }
    ])
    .then(response => {
        if (response.ifContinue) {
            menuQuestion();
        } else {
            console.log('Thank you. Please enter CTRL + C to exit this application.');
        }
    });
}

const menuQuestion = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menuChoice',
            message: 'What would you like to do?',
            choices: [
                new inquirer.Separator('VIEW:'),
                    'View All Departments',
                    'View All Roles',
                new inquirer.Separator('ADD NEW:'),
                    'Create a New Department',
                    'Create a New Role',
                new inquirer.Separator('UPDATE:'),
                    'Update a Department',
                    'Update a Role',
                new inquirer.Separator('DELETE:'),
                    'Delete a Department',
                    'Delete a Role',
                new inquirer.Separator()],
            default: 'View All Departments',
            loop: true
        }
    ])
    .then(choice => {
        // VIEW:
        // View All Departments
        if (choice.menuChoice === 'View All Departments') {
            getDepartments()
                .then(data => {askContinue()});
            return false;
        }
        // View All Roles
        else if (choice.menuChoice === 'View All Roles') {
            getRoles()
                .then(data => {askContinue()});
            return false;
        }
        
        // ADD NEW:
        // Create a New Department
        else if (choice.menuChoice === 'Create a New Department') {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'newDepartmentName',
                    message: 'Enter a new department name: ',
                    validate: newDepartmentNameInput => {
                        if (newDepartmentNameInput) {
                            return true;
                        } else {
                            console.log('Please enter a department name: ');
                            return false;
                        }
                    }
                }
            ]);
        }
        // Create a New Role
        else if (choice.menuChoice === 'Create a New Role') {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'newRoleTitle',
                    message: 'Enter a new role title: ',
                    validate: newRoleTitleInput => {
                        if (newRoleTitleInput) {
                            return true;
                        } else {
                            console.log('Please enter a role title: ');
                            return false;
                        }
                    }
                },
                {
                    type: 'number',
                    name: 'newRoleSalary',
                    message: 'Enter a new role salary: ',
                    validate: newRoleSalaryInput => {
                        if (newRoleSalaryInput) {
                            return true;
                        } else {
                            console.log('Please enter a role salary: ');
                            return false;
                        }
                    }
                },
                {
                    type: 'number',
                    name: 'newRoleDepartment',
                    message: 'Enter the ID of the department to which the new role belongs to: ',
                    validate: newRoleDepartmentInput => {
                        if (newRoleDepartmentInput) {
                            return true;
                        } else {
                            console.log('Please enter a department ID: ');
                            return false;
                        }
                    }
                }
            ]);
        }
        
        // UPDATE:
        // Update a Department
        else if (choice.menuChoice === 'Update a Department') {
            return inquirer.prompt([
                {
                    type: 'number',
                    name: 'updateDepartmentId',
                    message: 'Enter the ID of the department to update: ',
                    validate: updateDepartmentIdInput => {
                        if (updateDepartmentIdInput) {
                            return true;
                        } else {
                            console.log('Please enter the department ID: ');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'updateDepartmentName',
                    message: 'Enter the updated department name: ',
                    validate: updateDepartmentNameInput => {
                        if (updateDepartmentNameInput) {
                            return true;
                        } else {
                            console.log('Please enter the department name: ');
                            return false;
                        }
                    }
                }
            ]);
        }
        // Update a Role
        else if (choice.menuChoice === 'Update a Role') {
            console.log('For updating a role, leave any questions you do not wish to change blank by pressing enter without typing anything');
            return inquirer.prompt([
                {
                    type: 'number',
                    name: 'updateRoleId',
                    message: 'Enter the ID of the role to update: ',
                    validate: updateRoleIdInput => {
                        if (updateRoleIdInput) {
                            return true;
                        } else {
                            console.log('Please enter the role ID: ');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'updateRoleTitle',
                    message: 'Enter the updated role title: '
                },
                {
                    type: 'number',
                    name: 'updateRoleSalary',
                    message: 'Enter the updated role salary: '
                },
                {
                    type: 'number',
                    name: 'updateRoleDepartment',
                    message: 'Enter the updated department\'s ID: '
                }
            ]);
        }
        
        // DELETE:
        // Delete a Department
        else if (choice.menuChoice === 'Delete a Department') {
            return inquirer.prompt([
                {
                    type: 'number',
                    name: 'deleteDepartmentId',
                    message: 'Enter the ID of the department to delete: ',
                    validate: deleteDepartmentIdInput => {
                        if (deleteDepartmentIdInput) {
                            return true;
                        } else {
                            console.log('Please enter the department ID: ');
                            return false;
                        }
                    }
                }
            ]);
        }
        // Delete a Role
        else if (choice.menuChoice === 'Delete a Role') {
            return inquirer.prompt([
                {
                    type: 'number',
                    name: 'deleteRoleId',
                    message: 'Enter the ID of the role to delete: ',
                    validate: deleteRoleIdInput => {
                        if (deleteRoleIdInput) {
                            return true;
                        } else {
                            console.log('Please enter the role ID: ');
                            return false;
                        }
                    }
                }
            ]);
        }
    })
    .then(input => {
        if (!input) {
            return;
        }

        // Create new Department
        else if (input.newDepartmentName) {
            return addDepartment(input.newDepartmentName)
                .then(data => {askContinue()});
        }
        // Create new Role
        else if (input.newRoleTitle) {
            return addRole(input.newRoleTitle, input.newRoleSalary, input.newRoleDepartment)
                .then(data => {askContinue()});
        }
        
        // Update a Department
        else if (input.updateDepartmentId) {
            return updateDepartment(input.updateDepartmentId, input.updateDepartmentName)
                .then(data => {askContinue()});
        }
        // Update a Role
        else if (input.updateRoleId) {
            return updateRole(input.updateRoleId, input.updateRoleTitle, String(input.updateRoleSalary), String(input.updateRoleDepartment))
                .then(data => {askContinue()});
        }

        // Delete a Department
        else if (input.deleteDepartmentId) {
            return deleteDepartment(input.deleteDepartmentId)
                .then(data => {askContinue()});
        }
        // Delete a Role
        else if (input.deleteRoleId) {
            return deleteRole(input.deleteRoleId)
                .then(data => {askContinue()});
        }
    });
};

const init = () => {
    console.log(`
Welcome to the Employee Tracker!`
    );
    menuQuestion();
}

module.exports = init;
