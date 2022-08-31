const form = document.querySelector(".calculator-form");
const answerCard = document.querySelector(".answer-card");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const courseRating = document.querySelector("#course-rating").value;
  const slopeRating = document.querySelector("#slope-rating").value;
  const par = document.querySelector("#par").value;

  const golfObj = {
    courseRating,
    slopeRating,
    par,
  };
  axios.post("/api/calculator", golfObj).then( (res) => {
    console.log(res.data)
  createCard(res.data)
  }).catch( (err) => {
    console.log(err)
  });
});
function clearCalc() {
let clearCourse = document.querySelector("#course-rating");
let clearSlope = document.querySelector("#slope-rating");
let clearPar = document.querySelector("#par");

  const elements = document.querySelector('.returned-card')
  elements.remove();
  clearCourse.value = '';
  clearSlope.value = '';
  clearPar.value = '';
}

function createCard(handicap) {
  const card = document.createElement('div');
  //console.log(handicap);
  card.classList.add('returned-card');

  card.innerHTML = `<h4 class='returned-text'>Your handicap after this round is ${handicap} </h4><a class='clickable-refresh' onclick='clearCalc()' ><img src='./images/refresh.png' alt='refresh' class='refresh-pic'></img></a>`;
let handicapOutput = document.querySelectorAll('.returned-card')
if (handicapOutput.length < 1) {
  answerCard.appendChild(card);
}
}
