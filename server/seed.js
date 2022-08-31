require('dotenv').config();
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});





module.exports = {
getAllCourses: (req, res) => {
sequelize.query(`select * from golfcourses order by golfcourse_id asc`).then(dbRes => {

    res.status(200).send(dbRes[0])
})
},
createCourse: (req, res) => {
    let {title, rating, imageURL} = req.body;

    sequelize.query(`insert into golfcourses (title, rating, image)
    values('${title}', ${rating}, '${imageURL}')`).then(dbRes => {

        res.status(200).send(dbRes[0])
    })
},
deleteCourse: (req, res) => {
    let { id:destructuredId } = req.params;

    // console.log(courseIndex)
    sequelize.query(`delete from golfcourses where golfcourse_id = ${destructuredId}`).then(dbRes => {
        res.status(200).send(dbRes[0])
    })
   
},
updateCourse: (req, res) => {
    let {id:destructuredId} = req.params;
    let {type} = req.body
    
    sequelize.query(`select rating from golfcourses where golfcourse_id = ${destructuredId}`).then(dbRes => {
        let {rating} = dbRes[0][0];
        if(rating === 5 && type === 'plus' || rating === 1 && type === 'minus') {
            res.status(405)
            return;
        } 
        if (type === 'plus') {
            sequelize.query(`update golfcourses 
            set rating = rating + 1
            where golfcourse_id = ${destructuredId}`).then(dbRes => {
                res.status(200).send(dbRes[0])
            })
        } else {
            sequelize.query(`update golfcourses 
            set rating = rating - 1
            where golfcourse_id = ${destructuredId}`).then(dbRes => {
                res.status(200).send(dbRes[0])
            })
        }
    })
},
}