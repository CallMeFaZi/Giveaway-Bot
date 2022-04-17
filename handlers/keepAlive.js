const express = require('express');
const app = express();
const port = 3000 || 8080;

app.all('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<html><head> <link href="https://fonts.googleapis.com/css?famiy=Roboto Condensed" rel="stylesheet"> <style>body{font-family: "Roboto Condensed"; font-size: 21px; color: white; background-color: #23272A; margin-left: 5%; margin-top: 2%;}a{color: #5865F2}a:hover{color: #818bff}h1{font-size: 48px;}</style></head><body> <h1>Hosting Active</h1><h1>FaZi Chodder</h1>`);
  res.end();
});

function k() {
  app.listen(port, () => {
    console.log("24/7 KeepAlive Server is online!".bgGreen.white)
  });
}
module.exports = k;