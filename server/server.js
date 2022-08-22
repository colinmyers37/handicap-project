const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('client'));

const port = process.env.PORT || 4000;

const { getHomePage, getCss, getJs } = require('./controller/controller');


app.get('/', getHomePage);
app.get('/css', getCss);
app.get('/js', getJs);







app.listen(port,console.log(`server is running on port ${port}`));