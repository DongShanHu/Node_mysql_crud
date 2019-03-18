const mysql = require("mysql");
const express = require("express");
var app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employeedb",
  multipleStatements: true
});
mysqlConnection.connect(err => {
  if (!err) console.log("db.connect");
  else console.log("db failed \n error" + JSON.stringify(err));
});
app.listen(3000, () => console.log("express server is running port3000"));

// get the all employee
app.get("/employees", (req, res) => {
  mysqlConnection.query("select * from Employee", (err, rows, fields) => {
    if (!err) res.send(rows);
    // console.log(rows[0].EmpID);
    else console.log(err);
  });
});

// get  an  employee
app.get("/employees/:id", (req, res) => {
  mysqlConnection.query(
    "select * from Employee where EmpID=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      // console.log(rows[0].EmpID);
      else console.log(err);
    }
  );
});
//Delect  an  employee
app.delete("/employees/:id", (req, res) => {
  mysqlConnection.query(
    "delete  from Employee where EmpID=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("delete success");
      // console.log(rows[0].EmpID);
      else console.log(err);
    }
  );
});
//insert  an  employee
app.post("/employees", (req, res) => {
  let emp = req.body;
  // 擅用  / 可以分開兩段String
  var sql =
    "SET @EmpID= ?; SET @Name =?;SET @EmpCode =?;SET @Salary =?; \
  call EmployeeAddOrEdit(@EmpID,@Name, @EmpCode,@Salary);";
  mysqlConnection.query(
    sql,
    [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
    (err, rows, fields) => {
      if (!err)
        rows.forEach(element => {
          if (element.constructor == Array) {
            res.send("inserted employee id:" + element[0].EmpID);
          }
        });
      else console.log(err);
    }
  );
});

//update  an  employee
app.put("/employees", (req, res) => {
  let emp = req.body;
  // 擅用  / 可以分開兩段String
  var sql =
    "SET @EmpID= ?; SET @Name =?;SET @EmpCode =?;SET @Salary =?; \
  call EmployeeAddOrEdit(@EmpID,@Name, @EmpCode,@Salary);";
  mysqlConnection.query(
    sql,
    [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
    (err, rows, fields) => {
      if (!err) res.send("insert success");
      else console.log(err);
    }
  );
});
