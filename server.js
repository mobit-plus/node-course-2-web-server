const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
   
const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + '/views/Pratials');

hbs.registerHelper('getcurrentyear',() => {
    return new Date().getFullYear()
});

hbs.registerHelper('scremit',(text) =>{
   return text.toUpperCase();
});

app.set('view engine', 'hbs');


app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    

    fs.appendFileSync("server.log", log + '\n', (error) =>{
        if(error){
            console.log('Unable to server.log file append!');
        }
    });
    console.log(log);
    next();
});

// app.use((req,res,next) =>{
//     res.render('maintenence.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        Title: 'Home Page!',
        welcome: 'welcome my website!'
        
    });
});


app.get('/bad',(req,res) =>{
    res.send({
        errorMessage: 'Unable to Connect!',
    })
 });
 app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        Title: 'About Page',
        
    });
 });
 app.get('/project',(req,res) => {
    res.render('project.hbs',{
        Title: 'Project',
    });
 });
app.listen(port,() => {
    console.log(`The server connect to port ${port}`);
});