const inquirer = require('inquirer');
const { getDepartments, getDepartmentInfo, addDepartment, deleteDepartment }  = require('../lib/departments');
const { getRoles, getRoleInfo, addRole, updateRole, deleteRole } = require('../lib/roles');
const { getEmployees, addEmployee, updateEmployee, deleteEmployee } = require('../lib/employees');

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
                    'View All Employees',
                new inquirer.Separator('ADD NEW:'),
                    'Create a New Department',
                    'Create a New Role',
                    'Create a New Employee',
                new inquirer.Separator('UPDATE:'),
                    'Update a Role',
                    'Update an Employee',
                new inquirer.Separator('DELETE:'),
                    'Delete a Department',
                    'Delete a Role',
                    'Delete an Employee',
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
        // View All Employees
        else if (choice.menuChoice === 'View All Employees') {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeViewOrder',
                    message: 'How would you like to view all employees?',
                    choices: ['By Last Name', 'By Department', 'By Manager'],
                    default: 'By Last Name',
                    loop: false
                }
            ])
        }
        
        // ADD NEW:
        // Create a New Department
        else if (choice.menuChoice === 'Create a New Department') {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'newDepartmentName',
                    message: 'Enter a new department name:',
                    validate: newDepartmentNameInput => {
                        if (newDepartmentNameInput) {
                            return true;
                        } else {
                            console.log('Please enter a department name:');
                            return false;
                        }
                    }
                }
            ]);
        }
        // Create a New Role
        else if (choice.menuChoice === 'Create a New Role') {
            async function newRole() {
                var getDepartmentNames = await getDepartmentInfo();
                var deptNames = [];
                for (var i = 0; i < getDepartmentNames.length; i++) {
                    deptNames.push(getDepartmentNames[i].name);
                }
                return inquirer.prompt([
                    {
                        type: 'input',
                        name: 'newRoleTitle',
                        message: 'Enter a new role title:',
                        validate: newRoleTitleInput => {
                            if (newRoleTitleInput) {
                                return true;
                            } else {
                                console.log('Please enter a role title:');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'number',
                        name: 'newRoleSalary',
                        message: 'Enter a new role salary:',
                        validate: newRoleSalaryInput => {
                            if (newRoleSalaryInput) {
                                return true;
                            } else {
                                console.log('Please enter a role salary:');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'newRoleDepartment',
                        message: 'Select which department this new role will be in:',
                        choices: deptNames,
                        loop: false
                    }
                ]);
            }
            return newRole();
        }
        // Create a New Employee
        else if (choice.menuChoice === 'Create a New Employee') {
            async function newEmployee() {
                var getRoleTitles = await getRoleInfo();
                var roleTitles = [];
                for (var i = 0; i < getRoleTitles.length; i++) {
                    roleTitles.push(getRoleTitles[i].title);
                }
                return inquirer.prompt([
                    {
                        type: 'input',
                        name: 'newEmployeeFirstName',
                        message: 'Enter the new employee\'s first name:',
                        validate: newEmployeeFirstNameInput => {
                            if (newEmployeeFirstNameInput) {
                                return true;
                            } else {
                                console.log('Please enter a first name:');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'newEmployeeLastName',
                        message: 'Enter the new employee\'s last name:',
                        validate: newEmployeeLastNameInput => {
                            if (newEmployeeLastNameInput) {
                                return true;
                            } else {
                                console.log('Please enter a last name:');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'newEmployeeRole',
                        message: 'Select which role this new employee will have:',
                        choices: roleTitles,
                        loop: false
                    },
                    {
                        type: 'number',
                        name: 'newEmployeeManager',
                        message: 'Enter the employee ID of the manager for this new employee: (If no manager, leave blank by pressing enter without typing anything.)'
                    }
                ]);
            }
            return newEmployee();
        }
        
        // UPDATE:
        // Update a Role
        else if (choice.menuChoice === 'Update a Role') {
            return inquirer.prompt([
                {
                    type: 'number',
                    name: 'updateRoleId',
                    message: 'Enter the ID of the role to update:',
                    validate: updateRoleIdInput => {
                        if (updateRoleIdInput) {
                            return true;
                        } else {
                            console.log('Please enter the role ID:');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'updateRoleSelect',
                    message: 'For this role, which would you like to update?',
                    choices: ['Salary', 'Department'],
                    loop: false
                },
                {
                    type: 'number',
                    name: 'updateRoleInput',
                    message: 'What would you like to update the above value to?',
                    validate: updateRoleInputInput => {
                        if (updateRoleInputInput) {
                            return true;
                        } else {
                            console.log('Please enter a numerical response:');
                            return false;
                        }
                    }
                }
            ]);
        }
        // Update an Employee
        else if (choice.menuChoice === 'Update an Employee') {
            return inquirer.prompt([
                {
                    type: 'number',
                    name: 'updateEmployeeId',
                    message: 'Enter the ID of the employee to update:',
                    validate: updateRoleIdInput => {
                        if (updateRoleIdInput) {
                            return true;
                        } else {
                            console.log('Please enter the employee ID:');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'updateEmployeeSelect',
                    message: 'For this employee, which would you like to update?',
                    choices: ['Role', 'Manager'],
                    loop: false
                },
                {
                    type: 'input',
                    name: 'updateEmployeeInput',
                    message: 'What would you like to update the above value to? (To remove a manager, enter 0)',
                    validate: updateEmployeeInputInput => {
                        if (!isNaN(updateEmployeeInputInput)) {
                            return true;
                        } else {
                            console.log('Please enter a numerical response:');
                            return false;
                        }
                    }
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
                    message: 'Enter the ID of the department to delete:',
                    validate: deleteDepartmentIdInput => {
                        if (deleteDepartmentIdInput) {
                            return true;
                        } else {
                            console.log('Please enter the department ID:');
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
                    message: 'Enter the ID of the role to delete:',
                    validate: deleteRoleIdInput => {
                        if (deleteRoleIdInput) {
                            return true;
                        } else {
                            console.log('Please enter the role ID:');
                            return false;
                        }
                    }
                }
            ]);
        }
        // Delete an Employee
        else if (choice.menuChoice === 'Delete an Employee') {
            return inquirer.prompt([
                {
                    type: 'number',
                    name: 'deleteEmployeeId',
                    message: 'Enter the ID of the employee to delete:',
                    validate: deleteEmployeeIdInput => {
                        if (deleteEmployeeIdInput) {
                            return true;
                        } else {
                            console.log('Please enter the employee ID:');
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

        // View All Employees by Last Name
        else if (input.employeeViewOrder === 'By Last Name') {
            return getEmployees('employee.last_name')
                .then(data => {askContinue()});
        }
        // View All Employees by Department
        else if (input.employeeViewOrder === 'By Department') {
            return getEmployees('roles.department_id')
                .then(data => {askContinue()});
        }
        // View All Employees by Manager
        else if (input.employeeViewOrder === 'By Manager') {
            return getEmployees('mgr.last_name')
                .then(data => {askContinue()});
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
        // Create new Employee
        else if (input.newEmployeeFirstName) {
            return addEmployee(input.newEmployeeFirstName, input.newEmployeeLastName, input.newEmployeeRole, String(input.newEmployeeManager))
                .then(data => {askContinue()});
        }
        
        // Update a Role
        else if (input.updateRoleId) {
            return updateRole(input.updateRoleId, input.updateRoleSelect, input.updateRoleInput)
                .then(data => {askContinue()});
        }
        // Update an Employee
        else if (input.updateEmployeeId) {
            return updateEmployee(input.updateEmployeeId, input.updateEmployeeSelect, input.updateEmployeeInput)
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
        // Delete an Employee
        else if (input.deleteEmployeeId) {
            return deleteEmployee(input.deleteEmployeeId)
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
