/*

Name : Rohith Kumar Uppala
Project : Similarity Scores
File : Server.js
*/
'use strict'

var express = require('express');
var app = express();

var port = process.env.PORT || 8080;


var bodyParser = require('body-parser');
var mysql = require('mysql');
 
//templating engine
app.set('views', './src/views');      
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
 
// connection configurations
var mc = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
 
// connect to database
mc.connect();
 
// default route
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Population Chart'
    });
   // return res.send({ error: true, message: 'Hello Welcome to Pluralsight User based CF REST API' })
});
 
// Retrieve all todos 
app.get('/users', function (req, res) {
    mc.query('SELECT * FROM similarityScores LIMIT 50 ', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Similarity scores of all users' });
    });
});
 

// Retrieve todo with id 
app.get('/user/:id', function (req, res) {
 
    let task_id = req.params.id;
    console.log("I am here"+task_id)
    mc.query('SELECT * FROM similarityScores WHERE user_id=? AND other_id != ? ORDER BY score DESC LIMIT  20', [task_id,task_id], function (error, results, fields) {
        if (error) {console.log("error in", error)}
        
        return res.send(results);
        //return res.send({ error: false, data: results, message: 'Top 20 Similar Users for given id ' });
    });

});
 

//  Update todo with id
app.put('/user', function (req, res) {
 
    let user_id = req.body.id;
    let score = req.body.score;
 
    if (!task_id || !task) {
        return res.status(400).send({ error: task, message: 'Please provide score  and user_id' });
    }
 
    mc.query("UPDATE similarityScores SET score = ? WHERE user_id = ?", [score, user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User score has been updated successfully.' });
    });
});
 
//  Delete todo
app.delete('/user/:id', function (req, res) {
 
    let user_id = req.params.id;
 
    mc.query('DELETE FROM similarityScores WHERE user_id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User info has been updated successfully.' });
    });
});
 
// all other requests redirect to 404
app.all("*", function (req, res) {
    return res.status(404).send('Page not found !!! Please Try /user!!!')
});
 
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(port, function () {
    console.log('Node app is running on port '+port);
});


//module.exports = app;
