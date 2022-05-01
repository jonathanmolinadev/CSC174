var express = require("express");
var router = express.Router();
var mysql = require("mysql");

/* GET home page. */
router.get("/", function (req, res, next) {
  connection.connect();
  console.log("connection open");
  connection.end();
  console.log("connection closed");
  res.render("index", { title: "Express" });
});

router.get("/GetVideoGameTable", function (req, res, next) {
  var connection = mysql.createConnection({
    host: "host",
    user: "yourusername",
    password: "yourpassword",
    database: "yourdatabase",
  });

  connection.connect();
  connection.query("Call GetVideoGames()", function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    if (error) throw error;
    console.log("what is results:", results[0]);
    res.send(results[0]);
  });
  connection.end();
});

router.post("/InsertIntoVideoGameTable", function (req, res, next) {
  if (!req.query.id && !req.query.name) {
    res.status(400).send("ID or Name not provided.");
  } else {
    const id = req.query.id;
    const name = req.query.name;
    const studio = req.query.studio ? req.query.studio : null;
    const playTime = req.query.playTime ? req.query.playTime : null;
    var connection = mysql.createConnection({
      host: "host",
      user: "yourusername",
      password: "yourpassword",
      database: "yourdatabase",
    });

    connection.connect();
    var edituserSQL = "CALL InsertIntoVideoGames(?,?,?,?)";
    connection.query(
      edituserSQL,
      [id, name, studio, playTime],
      function (error, results, fields) {
        if (error) throw error;
        res.send("Inserted");
      }
    );
    connection.end();
  }
});

router.delete("/DeleteVideoGame/:id", function (req, res, next) {
  if (!req.params.id) {
    res.status(400).send("ID not provided");
  } else {
    const id = req.params.id;
    var connection = mysql.createConnection({
      host: "host",
      user: "yourusername",
      password: "yourpassword",
      database: "yourdatabase",
    });

    connection.connect();
    var deleteRecordSQL = "CALL DeleteVideoGame(?)";
    connection.query(deleteRecordSQL, [id], function (error, results, fields) {
      if (error) throw error;
      res.send("Deleted");
    });
    connection.end();
  }
});

module.exports = router;
