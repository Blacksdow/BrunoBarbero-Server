"use strict";
const fs=require("fs");
const dispatcher=require("./dispatcher");
const http=require("http");
let header={"Content-Type":"text/html;charset=utf-8"};
let headerJSON={"Content-Type":"application/json;charset=utf-8"};


const mongoFunctions=require("./mongoFunctions");


const TIMEOUT = 1000;
let port = 8888;



dispatcher.addListener("GET", "/api/addLeaderboard", function (req, res) {
  let query = {
    player: req.query.player,
    score: parseInt(req.query.score),
  };
  mongoFunctions.insertOne(
    req,
    "FlappyBird",
    "leaderBoard",
    query,
    function (err, data) {
      if (err.codErr == -1) {
        console.log(data);
        res.send("Inserimento andato a buon fine.");
      } else
        error(req, res, {
          code: err.codErr,
          message: err.message,
        });
    }
  );
});

dispatcher.addListener("GET", "/api/loadLeaderboard", function (req, res) {
  mongoFunctions.aggregate(
    "FlappyBird",
    "leaderBoard",
    [{ $sort: { score: 1 } }],
    function (err, data) {
      if (err.codErr == -1) {
        res.send(data);
      } else error(req, res, { code: err.codErr, message: err.message });
    }
  );
});

app.get

/* ************************************************************* */
function error(req,res,err){
  res.writeHead(err.code,header);
  res.end(err.message);
}

/* Creazione del server */

http.createServer(function (req,res){
  dispatcher.dispatch(req,res);
}).listen(8888);
dispatcher.showList();
console.log("Server running on port 8888...");