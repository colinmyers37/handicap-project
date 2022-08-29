const path = require('path');
const GOLFCOURSES = require('../config/db.json')
let base_id = 11

module.exports = {
    getHomePage: (req,res) => {
        res.sendFile(path.join(__dirname, '../../client/home.html'));
    },
    getCss: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/style.css'));
    },
    getJs: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/main.js'));
    },
    getCalculator: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/calculator.html'));
    },
    getRating: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/rating.html'));
    },
    getCalculatorJs: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/calculator.js'));
    },
    getRatingJs: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/rating.js'));
    },
    getRatingCss: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/rating.css'));
    },
    getHandicap: (req, res) => {
        const { courseRating, slopeRating, par} = req.body;
        let handicap = (par - courseRating) * 113 / slopeRating;
        handicap = Math.round(handicap);
        if(handicap < 0) {
            handicap = 0;
        }
        handicap += '';
        console.log(handicap);
        res.status(200).send(handicap);
    },
    getAll: (req, res) => {
        res.status(200).send(GOLFCOURSES)
    },
    createGolfcourse: (req, res) => {
        let { title, rating, imageURL } = req.body
        let new_golfcourse = {
            id: base_id,
            title,
            rating,
            imageURL
        }
        GOLFCOURSES.push(new_golfcourse)
        base_id++
        // console.log(GOLFCOURSES);
        res.status(200).send(GOLFCOURSES)
    },
    deleteGolfcourse: (req, res) => {
        // console.log("button clicked");
        let index = GOLFCOURSES.findIndex( golfcourse => golfcourse.id === +req.params.id)
        GOLFCOURSES.splice(index, 1)
        res.status(200).send(GOLFCOURSES)
    },
    updateGolfcourse: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = GOLFCOURSES.findIndex( golfcourse => golfcourse.id === +id)
        

        if (GOLFCOURSES[index].rating === 5 && type === "plus" || GOLFCOURSES[index].rating === 1 && type === "minus") {
            console.log("cant do that");
            res.status(405).send(GOLFCOURSES)
            return;
        }
        //a ? b : c
        type === "plus" ? GOLFCOURSES[index].rating++ : GOLFCOURSES[index].rating--

        res.status(200).send(GOLFCOURSES)
    },
}