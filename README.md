# Employee Tracker

This employee tracker allows business owners to manage the departments, roles, and employees through the command line. The user is able to select if they would like to view, which displays the respective tables, or add, edit, or delete, which then inquires further for more specific information to change. All information is stored in a SQL database.

## Video

[![Click link to view video](./video/screenshot.png)](https://drive.google.com/file/d/1ZOPyhxvfkF5h4Q_yqwluuNLqwa25ljt-/view?usp=sharing)

View video of the working application: [Download Local File](https://github.com/JColeCodes/empire-sequel/raw/main/video/Employee%20Tracker.mp4) | [Google Drive](https://drive.google.com/file/d/1ZOPyhxvfkF5h4Q_yqwluuNLqwa25ljt-/view?usp=sharing)

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation
To install this project, please follow these steps: 
1. Make sure you have [Node.js](https://nodejs.org) and [MySQL](https://dev.mysql.com/downloads/) installed.
2. Through the command line, go to the folder you wish this application's folder to be in.
3. Do `git clone` of the repository to get the application's files.
4. Enter `mysql -u root -p` to open MySQL.
5. Run `source db/db.sql` to get the database, then run `source db/schema.sql` to get the tables, then run `source db/seeds.sql` to get the seeds.

This program requires the following packages from npm: 
* [express](https://www.npmjs.com/package/express)
* [mysql2](https://www.npmjs.com/package/mysql2)
* [inquirer](https://www.npmjs.com/package/inquirer)
* [console.table](https://www.npmjs.com/package/console.table)
* [dotenv](https://www.npmjs.com/package/dotenv)

In order to install all of them, enter the following into the command line:
```
npm install
```

## Usage
To run this project, enter the following into the command line:
```
npm start
```

## Contributing
If you would like to contribute to this project, you can do so by:
1. Forking the project. ([Learn how to fork.](https://docs.github.com/en/get-started/quickstart/fork-a-repo))
2. Creating a new feature branch, committing the changes, and pushing the branch.
3. Opening a [Pull Request](https://github.com/JColeCodes/empire-sequel/pulls).

You can also check the list of [Issues](https://github.com/JColeCodes/empire-sequel/issues).

Read the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

## Tests
This application does not have any tests written for it.

## Questions
Employee Tracker was created by [JColeCodes](https://github.com/JColeCodes). For inquiries regarding the project, please email the creator at [capauldi@gmail.com](mailto:capauldi@gmail.com).