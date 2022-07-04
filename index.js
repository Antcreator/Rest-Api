const express = require('express');
const { getEmployeeByID } = require('./src/controllers/employee.contoller');

//create express app
const app = express();
const bodyParser = require('body-parser');

// setup the server port
const port = process.env.PORT || 5000;

// parse request data content type application/x-ww-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get('/', (req, res) =>{
   res.send('Hello World')
});
// import employee routes
const employeeRoutes = require('./src/routes/employees.route');

// create employee routes
app.use('/api/v1/employee', employeeRoutes);

// listen to port
app.listen(port, () =>{
    console.log(`Express Server is running at port ${port}`);
});