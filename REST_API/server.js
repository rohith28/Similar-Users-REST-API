/*

Name : Rohith Kumar Uppala
Project : Similarity Scores
File : Server.js
*/


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
 
// connection configurations
const mc = mysql.createConnection({
    host: 'mysqlinstance.cjm8qag6rwgx.us-east-1.rds.amazonaws.com',
    user: 'mydb',
    password: '9542582841',
    database: 'pluralsight'
});
 
// connect to database
mc.connect();
 
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'Hello Welcome to Pluralsight User based CF REST API' })
});
 
// Retrieve all todos 
app.get('/users', function (req, res) {
    mc.query('SELECT * FROM similarityScores DESC LIMIT 50 ', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Similarity scores of all users' });
    });
});
 

// Retrieve todo with id 
app.get('/user/:id', function (req, res) {
 
    let task_id = req.params.id;
    console.log("I am here")
    mc.query('SELECT * FROM similarityScores WHERE user_id=? AND other_id != ? ORDER BY score DESC LIMIT  20', [task_id,task_id], function (error, results, fields) {
        if (error) {console.log("error in", error)}
        return res.send({ error: false, data: results, message: 'Top 20 Similar Users for given id ' });
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
    return res.status(404).send('Page not found !!! Please Try /todo!!!')
});
 
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(8080, function () {
    console.log('Node app is running on port 8080');
});


//module.exports = app;
