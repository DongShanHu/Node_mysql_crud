// const mysql = require( "mysql" );
const express = require( "express" );
var app = express();
const bodyparser = require( "body-parser" );
app.use( bodyparser.json() );
const routes = require( './src/routes/Emproute' );
//將CRUD擺至route
//參考網站 https://www.udemy.com/restful-api-with-express/learn/lecture/12778943#content
//https://www.youtube.com/watch?v=EN6Dx22cPRI
routes( app );
app.listen( 3000, () => console.log( "express server is running port3000" ) );