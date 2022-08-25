const path = require('path');

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
}