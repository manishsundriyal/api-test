let express = require('express');
let app = express();
let fs = require('fs');
app.use(express.json());
let counter = 10;

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/" + "database.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
 })

 app.post('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "database.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        // console.log(req.body.user);
        data = Object.assign({},data,{["user"+counter++]:req.body.user});
        // console.log( data );
        fs.writeFile( __dirname + "/" + "database.json",JSON.stringify(data),function(error){
            if(error){
                console.log(error);
            }
        });
        res.end( JSON.stringify(data));
    });
 })

 app.get('/getMessage',function(req, res){

    res.status(200).send({name: "Sapna Upreti", message:"Happy Teacher's Day", success: true});

 })

 app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "database.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
    });
 })

 var server = app.listen(process.env.PORT, function () {
 
   var host = server.address().address
   var port = server.address().port
 
   console.log("Example app listening at http://%s:%s", host, port)
 
 })
