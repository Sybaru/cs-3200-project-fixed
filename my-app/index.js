const express = require("express");
const mysql = require("mysql");
const cors = require("cors");


const app = express();

var user;

function setUser(value) {
    user = value;
    console.log(user);
}

function getUser() {
    return user;
}

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "songdb",
});

app.listen(3001, () =>  {
    console.log("running server");
});

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query(
        "INSERT INTO users (email, password) VALUES (?,?)",
        [username, password],
        (err, result) => {
            console.log(err);
        }
    );
});

app.post('/login', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT id FROM users WHERE email = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err) {
              res.send({err: err});
            } 

            setUser(result[0].id);

            if (result.length > 0) {
                res.send(true);
            } else {
                res.send({message: "Username/Password is incorrect"});
            }
        }
    );
});

app.post("/all", (req, res) => {
    db.query(
        "SELECT * FROM song as s JOIN record_label as r ON r.label_id = s.record_label JOIN artist as a ON a.artist_id = s.artist_id",
        (err, result) => {
            if (err) console.log(err);
            console.log(result);
            res.send(result);
        }
    );
});