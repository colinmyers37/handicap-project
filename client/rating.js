const golfcoursesContainer = document.querySelector('#golfcourses-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/golfcourses`

const golfcoursesCallback = ({ data: golfcourses }) => displayGolfcourses(golfcourses)
const errCallback = err => console.log(err.response.data)

const getAllGolfcourses = () => axios.get(baseURL).then(golfcoursesCallback).catch(errCallback)
const createGolfcourse = body => axios.post(baseURL, body).then(golfcoursesCallback).catch(errCallback)
const deleteGolfcourse = id => axios.delete(`${baseURL}/${id}`).then(golfcoursesCallback).catch(errCallback)
const updateGolfcourse = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(golfcoursesCallback).catch(errCallback)

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

function createGolfcourseCard(golfcourse) {
    const golfcourseCard = document.createElement('div')
    golfcourseCard.classList.add('golfcourse-card')

    
    golfcourseCard.innerHTML = `<img alt='${golfcourse.title}' src=${golfcourse.imageURL} class="golfcourse-cover"/>
    <p class="golfcourse-title">${golfcourse.title}</p>
    <div class="btns-container">
    <button id="minus-btn" onclick="updateGolfcourse(${golfcourse.id}, 'minus')">-</button>
    <p class="golfcourse-rating">${golfcourse.rating} stars</p>
    <button onclick="updateGolfcourse(${golfcourse.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteGolfcourse(${golfcourse.id})">delete</button>
    `
    
    
    golfcoursesContainer.appendChild(golfcourseCard)

}
console.log(createGolfcourseCard)
function displayGolfcourses(arr) {
    golfcoursesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createGolfcourseCard(arr[i])
    }
}
form.addEventListener('submit', submitHandler)
getAllGolfcourses()