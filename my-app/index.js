const express = require("express");
const mysql = require("mysql");
const cors = require("cors");


const app = express();

var user = 0;

function setUser(value) {
    console.log(user);
    user = value;
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

app.post("/checkLogin", (req, res) => {
    console.log(getUser())
    if (user == 0) {
        res.send(false);
    } else {
      res.send(true);
    }
});

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query(
        "INSERT INTO users (userName, userPassword) VALUES (?,?)",
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
        "SELECT userId FROM users WHERE userName = ? AND userPassword = ?",
        [username, password],
        (err, result) => {
            console.log(err);
            if (err) {
              res.send({err: err});
            } 

            setUser(result[0].userId);

            if (result.length > 0) {
                res.send(result);
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
            res.send(result);
        }
    );
});

app.post("/newList", (req, res)=> {
    const playlistName = req.body.playlistName;

    db.query(
        "INSERT INTO list_of_playlists (playlist_title, userID) VALUES (?,?)",
        [playlistName, getUser()],
        (err, result) => {
            if (err) {
              res.send({err: err});
            } 
            res.send(result);
        }
    );
});

app.post("/editList", (req, res)=> {
    const playlistName = req.body.playlistName;
    const playlistId = req.body.playlistId;

    db.query(
        "UPDATE list_of_playlists SET playlist_title = ? WHERE userId = ?",
        [playlistName, playlistId],
        (err, result) => {
            if (err) {
              res.send({err: err});
            } 
            res.send(result);
        }
    );
});

app.post("/deleteList", (req, res)=> {
    const playlistId = req.body.playlistId;

    db.query(
        "DELETE FROM list_of_playlists WHERE UserID = ? AND list_Id = ?",
        [getUser(), playlistId],
        (err, result) => {
            if (err) {
              res.send({err: err});
            } 
            res.send(result);
        }
    );
});

app.post("/allMy", (req, res) => {
    db.query(
        "SELECT * FROM list_of_playlists WHERE UserID = ?",
        [getUser()],
        (err, result) => {
            if (err) console.log(err);
            console.log(result);
            res.send(result);
        }
    );
});

app.post("/indivList", (req, res) => {
    const playlistId = req.body.playlistId;

    db.query(
        "SELECT * FROM individual_playlist as i LEFT JOIN song as s ON s.song_id = i.song_id JOIN artist as a ON s.artist_id = a.artist_id WHERE list_playlist_id = ?",
        [playlistId],
        (err, result) => {
            if (err) console.log(err);
            res.send(result);
        }
    );
});

app.post("/addToPlaylist", (req, res)=> {
    const playlistId = req.body.playlistId;
    const songId = req.body.songId

    db.query(
        "INSERT INTO individual_playlist (song_id, list_playlist_id) VALUES (?,?)",
        [songId, playlistId],
        (err, result) => {
            if (err) {
              res.send({err: err});
            } 
            res.send(result);
        }
    );
});

app.post("/deleteSong", (req, res)=> {
    const playlistId = req.body.playlistId;
    const songId = req.body.songId

    db.query(
        "DELETE FROM individual_playlist WHERE song_id = ? AND list_playlist_id = ?",
        [songId, playlistId],
        (err, result) => {
            if (err) {
              res.send({err: err});
            } 
            res.send(result);
        }
    );
});

app.post("/allLists", (req, res)=> {

    db.query(
        "SELECT list_id, playlist_title, userName FROM list_of_playlists as l JOIN users as u on u.userId = l.userID",
        (err, result) => {
            if (err) {
              res.send({err: err});
            } 
            res.send(result);
        }
    );
});