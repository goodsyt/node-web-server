const express = require('express');
const pug = require('pug');
const fs = require('fs');
const port = process.env.PORT || 3000;

const compiledHome = pug.compileFile('./view/home.pug');
const compiledAbout = pug.compileFile('./view/about.pug');
const compiledProfile = pug.compileFile('./view/profile.pug');
const currentYear = new Date().getFullYear();
var app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.use((req, rsp, next) => {
  var now = new Date().toString();
  var log = `${now}, ${req.method} ${req.path}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if(error){
      console.log('unable to append to server.log');
    }
  });  
  next();
});
app.get('/', (req, rsp) => {
  rsp.send(compiledHome({
    pageTitle: 'Main page',
    currentYear: currentYear
  }));  
});
app.get('/about', (req, rsp) => {
  rsp.send(compiledAbout({
    pageTitle: 'About page',
    currentYear: currentYear
  }));
});
app.get('/profile', (req, rsp) => {
  rsp.send(compiledProfile({
    pageTitle: 'Profile',
    currentYear: currentYear
  }));
});
app.get('/bad', (req, rsp) => {
  rsp.send({
    errorMessage: 'Oops! Something wrong....'
  });
});

app.listen(port, ()=> {
  console.log(`Server is up on port ${port}`);
});