const inquirer = require('inquirer');
const { getDepartments, addDepartment, updateDepartment, deleteDepartment }  = require('../routes/apiRoutes/departmentRoutes');

const menuQuestion = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menuChoice',
            message: 'What would you like to do?',
            choices: [
                new inquirer.Separator('VIEW:'),
                    'View All Departments',
                new inquirer.Separator('ADD NEW:'),
                    'Create a New Department',
                new inquirer.Separator('UPDATE:'),
                    'Update a Department',
                new inquirer.Separator('DELETE:'),
                    'Delete a Department',
                new inquirer.Separator()],
            default: 'View',
            loop: true
        }
    ])
    .then(choice => {
        // DEPARTMENT:
        if (choice.menuChoice === 'View All Departments') {
            getDepartments()
                .then(data => {menuQuestion()});
            return false;
        } else if (choice.menuChoice === 'Create a New Department') {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'newDepartmentName',
                    message: 'Enter a new department name: ',
                    validate: newDepartmentNameInput => {
                        if (newDepartmentNameInput) {
                            return true;
                        } else {
                            console.log('Please enter the department name: ');
                            return false;
                        }
                    }
                }
            ]);
        } else if (choice.menuChoice === 'Update a Department') {
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
        } else if (choice.menuChoice === 'Delete a Department') {
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
    })
    .then(input => {
        console.log(input);
        if (!input) {
            return;
        } else if (input.newDepartmentName) {
            // Create new Department
            return addDepartment(input.newDepartmentName)
                .then(data => {menuQuestion()});
        } else if (input.updateDepartmentName) {
            // Update a Department
            return updateDepartment(input.updateDepartmentId, input.updateDepartmentName)
                .then(data => {menuQuestion()});
        } else if (input.deleteDepartmentId) {
            // Delete a Department
            return deleteDepartment(input.deleteDepartmentId)
                .then(data => {menuQuestion()});
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
