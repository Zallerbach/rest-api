// sätter port numret
const PORT = 8080;''

// Importerar nödvändiga moduler.
const mysql = require("mysql");
var app = require('express')();
var bodyParser = require("body-parser")

// Konfigurerar body-parser-mellanprogrammet.
app.use(bodyParser.urlencoded({ extended: false }))// Tolkar URL-kodade bodies
app.use(bodyParser.json())//Tolkar JSON-bodies.

// Hanterar GET-begäran för att hämta användarinformation baserat på ID.
app.get('/users/:id', function (req, res) {
    const id = req.params.id;
    var sql = `SELECT * FROM users  WHERE id = "${id}"`
    con.query(sql, function (err, result, fields) {
        if (err) throw err
        res.json(result)
    });
});

// Skapar en MySQL-anslutning.
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "api"
});

// Hanterar POST-begäran för att skapa en ny användare.
app.post('/users', function (req, res) {
    let sql = `INSERT INTO users (username, first_name, last_name, password)
   VALUES ('${req.body.username}', '${req.body.first_name}','${req.body.last_name}','${req.body.password}')`

    con.query(sql, function (err, result, fields) {
        if (err) throw err
        res.send(result)
    });
});


// Startar servern och lyssnar på den angivna porten.
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})