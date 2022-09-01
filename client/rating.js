"use strict";

const golfcoursesContainer = document.querySelector('#golfcourses-container')
const form = document.querySelector('form')

const baseURL = `/api/golfcourses`

const golfcoursesCallback = ({ data: golfcourses }) =>  {
    document.querySelector('#title').value = '';
    document.querySelector('#img').value = '';
    displayGolfcourses(golfcourses) 
    // console.log(golfcourses)
}

const errCallback = err => console.log(err.response.data)

const getAllGolfcourses = () => axios.get(baseURL).then(golfcoursesCallback).catch(errCallback)
const createGolfcourse = body => axios.post(baseURL, body).then(getAllGolfcourses).catch(errCallback)
const deleteGolfcourse = id => axios.delete(`${baseURL}/${id}`).then(getAllGolfcourses).catch(errCallback)
const updateGolfcourse = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(getAllGolfcourses).catch(errCallback)



function submitHandler(e) {
    e.preventDefault()
    
    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')
    
    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }
    
    createGolfcourse(bodyObj)
    
    title.value = ''
    rating.checked = false
    imageURL.value = ''
}

async function createGolfcourseCard(golfcourse) {
    const golfcourseCard = document.createElement('div')
    golfcourseCard.classList.add('golfcourse-card')
let img = await golfcourse.image || golfcourse.imageURL
let newId = await golfcourse.golfcourse_id || golfcourse.id
    
    golfcourseCard.innerHTML = `<img alt='${golfcourse.title}' src=${img} class="golfcourse-cover"/>
    <p class="golfcourse-title">${golfcourse.title}</p>
    <div class="btns-container">
    <button id="minus-btn" onclick="updateGolfcourse(${newId}, 'minus')">-</button>
    <p class="golfcourse-rating">${golfcourse.rating} stars</p>
    <button onclick="updateGolfcourse(${newId}, 'plus')">+</button>
    </div>
    <button class="btn btn-dark" onclick="deleteGolfcourse(${newId})">delete</button>
    `
    
    
    golfcoursesContainer.appendChild(golfcourseCard)

}
// console.log(createGolfcourseCard)
function displayGolfcourses(arr) {
    // console.log(arr, 'this is inside displayGolfcourses')
    golfcoursesContainer.innerHTML = ``;
    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i])
        createGolfcourseCard(arr[i])
    }
}
form.addEventListener('submit', submitHandler)
getAllGolfcourses()