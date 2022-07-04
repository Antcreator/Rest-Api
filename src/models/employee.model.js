const res = require('express/lib/response');
var dbConn = require('../../config/db.config');

var Employee = function(employee) {
    this.first_name   =  employee.first_name;
    this.last_name    =  employee.last_name;
    this.email        =  employee.email;
    this.phone        =  employee.phone;
    this.organization   =  employee.organization;
    this.post         =  employee.post;
    this.salary       =  employee.salary;
    this.status       =  employee.status ? employee.status : 1;
    this.created_at   =  new Date();
    this.updated_at   =  new Date();
}

// get all employees
Employee.getAllEmployees = (result) => {
    dbConn.query('SELECT * FROM employees', (err, res) =>{
        if(err){
            console.log('Error while fetching employees', err);
            result(null,err);
        }else{
            console.log('Employess fetched successfully');
            result(null,res);
        }
    })
}

// get employee by ID from DB
Employee.getEmployeeByID = (id, result) => {
    console.log(id);
    dbConn.query('SELECT * FROM employees WHERE id=?', id, (err, res) =>{
        if(err){
            console.log('Error while fetching employee by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// create new employee
Employee.createEmployee = (employeeReqData, result) => {
    dbConn.query('INSERT INTO employees (first_name, last_name, email, phone, organization, post, salary, status) VALUES (?,?,?,?,?,?,?,?)', Object.values(employeeReqData), (err, res) => {
        if(err){
            console.log('Error while inserting data');
            result(null, err);
        }else{
            console.log('Employee created successfully');
            result(null, res);
        }
    })
}

// update employee
Employee.updateEmployee = (id, employeeReqData, result) => {
    dbConn.query('UPDATE employees SET first_name=?, last_name=?, email=?, phone=?, organization=?, post=?, salary=?, status=? WHERE id = ?', [employeeReqData.first_name, employeeReqData.last_name, employeeReqData.email, employeeReqData.phone, employeeReqData.organization, employeeReqData.post, employeeReqData.salary, employeeReqData.status, id], (err, res) => {
        if(err){
            console.log('Error while updating employee');
            result(null, err);
        }else{
            console.log("Employee Updated Successfully");
            result(null, res);
        }
    })
}

// delete employee
Employee.deleteEmployee = (id, result) => {
    dbConn.query('DELETE FROM employees WHERE id=?', [id], (err, res) => {
        if(err){
            console.log('Error while deleting the employee');
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

module.exports = Employee;