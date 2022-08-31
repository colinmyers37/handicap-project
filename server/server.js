const express = require('express');
const cors = require('cors');
const app = express();
const colors = require('colors');
require('dotenv').config();





app.use(cors());
app.use(express.json());
app.use(express.static('client'));

const port = process.env.PORT || 4000;

const testing = false;

const { getHomePage, getCss, getJs, getCalculator, getRating, getRatingJs, getCalculatorJs, getHandicap, getRatingCss, getAll } = require('./controller/controller');
const { getAllCourses, createCourse, deleteCourse, updateCourse } = require('./seed.js') 


app.get('/', getHomePage);
app.get('/css', getCss);
app.get('/js', getJs);
app.get('/calculator', getCalculator);
app.get('/rating', getRating);
app.get('/calculatorJs', getCalculatorJs);
app.get('/ratingJs', getRatingJs);
app.get('/ratingCss', getRatingCss);


app.post('/api/calculator' , getHandicap)


app.get('/api/golfcourses', testing && getAll || getAllCourses);
app.post("/api/golfcourses",  testing && createGolfcourse || createCourse);
app.delete("/api/golfcourses/:id", testing && deleteGolfcourse || deleteCourse);
 app.put("/api/golfcourses/:id", testing && updateGolfcourse || updateCourse);




//testing
function log(mes) {
    console.log(mes);
}

app.showRoutingInformation = () => {
    log('-Registered routes...'.white)    
    
    const routes = [];
    app._router.stack.forEach(function(middleware){
        let route;
        
        if(middleware.route){ // routes registered directly on the app
            routes.push(middleware.route);
        } else if(middleware.name === 'router'){ // router middleware 
            middleware.handle.stack.forEach(function(handler){
                route = handler.route;
                route && routes.push(route);
            });
        }
        
    });
    routes.forEach(route => {
        log(`Route path: `.white + `${route.path}`.green);
        route.stack.forEach(stack => {
            log(`-Route function: `.white + `${stack.name}`.brightBlue);
            log(`-Route method: `.white + `${stack.method}`.magenta); 
        });
        
    });
    
}


app.showRoutingInformation()


app.listen(port,console.log(`server is running on port ${port}`));