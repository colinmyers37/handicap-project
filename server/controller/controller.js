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
}