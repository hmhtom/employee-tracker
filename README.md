# Employee Tracker

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [License](#license)

## Description

A light weighted command-line database tool to manage company's departments, roles and employees. Mainly develope with Inquirer and Mysql2.

## Installation

> 1. Use `git clone https://github.com/hmhtom/employee-tracker.git` to clone the repository under your local
> 2. Go to the root folder of the repository
> 3. Make sure `Nodejs` is installed on your computer
> 4. Run `npm install` to install the dependencies
> 5. Login to your database in console, use `source db/schema.sql` to create new database, and use `source db/seeds.sql` to seed database with example seeds
> 6. Make sure your `.env` file contains  `DB_USER=<database user name>` and `DB_PASSWORD=<database password>`
> 7. Run `npm start` to start

## Usage

> 1. Once the application is running, main menu is presented with options to view and add employee, role and department, also update employee role.
> 2. Choose any of the option and follow the prompt to do CRUD interaction with database
> 3. When finish choose `exit` in main menu and the program will exit

[Here is a walkthrough video to the application](https://drive.google.com/file/d/1eIZ2BH_IkRPGxq6HbF8WXDnbn8LgPYOC/view)

## Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License ![MIT](https://img.shields.io/github/license/hmhtom/employee-tracker?style=plastic)

Copyright (c) 2022 hmhtom

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
