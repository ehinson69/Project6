// Variables to require dependencies 
let data = require("./data.json")
const projects = data.projects
const express = require('express')
const app = express();

// Starts Middleware and sets engine to pug
app.set('view engine', 'pug'); 
app.use('/static', express.static('public'));

//Index route for "Home" page
app.get('/', (req, res) => {
  res.render('index', { projects: projects });
});

//About route "About" page
app.get('/about', (req, res) => { 
  res.render('about');
});

//Accesses project pug
app.get('/project/:id', (req, res) => { 
  const id = req.params.id // accesses the route parameter
  res.render('project', {
    project: projects[id]
  });
});

//Error message handler and sets status code  
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  console.log('Check URL- THIS PAGE NOT FOUND')
  err.status = 404;
  next(err);
});

//Locals to be passed to the Pug template
app.use((err, req, res, next) => {
  res.locals.error = err;
  let status = err.status;
if (status === 'undefined') {
  status = 500;
  res.status(status);
}
  res.render('error');
});

//Listening on port 3000
app.listen(3000, () => { 
  console.log('The application is running on localhost:3000!')
});