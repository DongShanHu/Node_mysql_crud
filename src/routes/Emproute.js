const mysql = require( "mysql" );

var mysqlConnection = mysql.createConnection( {
  host: "localhost",
  user: "root",
  password: "",
  database: "employeedb",
  multipleStatements: true
} );
mysqlConnection.connect( err => {
  if ( !err ) console.log( "db.connect" );
  else console.log( "db failed \n error" + JSON.stringify( err ) );
} );


const routes = ( app ) => {
  app.route( "/employees" )

    // get the all employee
    .get( ( req, res ) => {
      mysqlConnection.query( "select * from Employee", ( err, rows, fields ) => {
        if ( !err ) res.send( rows );
        // console.log(rows[0].EmpID);
        else console.log( err );
      } );
    } )

  // // get  an  employee
  app.get( "employees/:id", ( req, res ) => {
    mysqlConnection.query(
      "select * from Employee where EmpID=?",
      [ req.params.id ],
      ( err, rows, fields ) => {
        if ( !err ) res.send( rows );
        // console.log(rows[0].EmpID);
        else console.log( err );
      }
    );
  } )
  //Delect  an  employee
  app.get( "/delete/:id", ( req, res ) => {
    mysqlConnection.query(
      "delete  from Employee where EmpID=?",
      [ req.params.id ],
      ( err, rows, fields ) => {
        if ( !err ) res.send( "delete success" );
        // console.log(rows[0].EmpID);
        else console.log( err );
      }
    );
  } )


  //Update  an  employee
  app.get( "/update/:id", ( req, res ) => {
      const newName = 'kobe';
      let sql = `UPDATE  Employee  SET Name = '${newName}' WHERE EmpID = ${req.params.id}`;
      let query = mysqlConnection.query( sql, ( err, result ) => {
        if ( err ) throw err;
        console.log( result );
        res.send( 'update updated...' );
      } )
    } )



    //insert  an  employee
    .post( ( req, res ) => {
      let emp = req.body;
      // 擅用  / 可以分開兩段String
      var sql =
        "SET @EmpID= ?; SET @Name =?;SET @EmpCode =?;SET @Salary =?; \
  call EmployeeAddOrEdit(@EmpID,@Name, @EmpCode,@Salary);";
      mysqlConnection.query(
        sql,
        [ emp.EmpID, emp.Name, emp.EmpCode, emp.Salary ],
        ( err, rows, fields ) => {
          if ( !err )
            rows.forEach( element => {
              if ( element.constructor == Array ) {
                res.send( "inserted employee id:" + element[ 0 ].EmpID );
              }
            } );
          else console.log( err );
        }
      );
    } )

    //update  an  employee
    .put( ( req, res ) => {
      let emp = req.body;
      // 擅用  / 可以分開兩段String
      var sql =
        "SET @EmpID= ?; SET @Name =?;SET @EmpCode =?;SET @Salary =?; \
  call EmployeeAddOrEdit(@EmpID,@Name, @EmpCode,@Salary);";
      mysqlConnection.query(
        sql,
        [ emp.EmpID, emp.Name, emp.EmpCode, emp.Salary ],
        ( err, rows, fields ) => {
          if ( !err ) res.send( "insert success" );
          else console.log( err );
        }
      );
    } );
}
module.exports = routes;