const req = require('express/lib/request');
const res = require('express/lib/response');
const EmployeeModel = require('../models/employee.model');

// get all employee list

exports.getEmployeeList = (req, res) => {
    //console.log('here are all the employees list');
    EmployeeModel.getAllEmployees((err, employees) => {
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Employees', employees);
        res.send(employees)
    })
}

// get employee by ID
exports.getEmployeeByID = (req, res) => {
    //console.log('get emp by id');
    EmployeeModel.getEmployeeByID(req.params.id, (err, employee) => {
        if(err)
        res.send(err);
        console.log('single employee data', employee);
        res.send(employee)
    })
}

// create new employee
exports.createNewEmployee = (req, res) => {
    console.log('req data', req.body);
    const employeeReqData = new EmployeeModel(req.body);
    // check null
    if(req.body.constructor === Object && Object.key(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        EmployeeModel.createEmployee(employeeReqData, (err, employee) => {
            if(err)
                res.send(err);
                res.json({status: true, message: 'Employee created successfully', data: employee})
        })
    }
}

// update employee
exports.updateEmployee = (req, res) => {
    console.log('req data', req.body);
    const employeeReqData = new EmployeeModel(req.body);
    // check null
    if(req.body.constructor === Object && Object.key(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        EmployeeModel.updateEmployee(req.params.id, employeeReqData, (err, employee) => {
            if(err)
                res.send(err);
                res.json({status: true, message: 'Employee updated successfully', data: employee})
        })
    }
}

// delete employee
exports.deleteEmployee = (req, res) => {
    EmployeeModel.deleteEmployee(req.params.id, (err, employee) => {
        if(err)
        res.send(err);
        res.json({success:true, message: 'Employee deleted successfully!'});
    })
}