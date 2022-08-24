let handicapIndex = document.querySelector('#handicap-index').value;
let courseRating = document.querySelector('#course-rating').value;
let slopeRating = document.querySelector('#slope-rating').value;
let par = document.querySelector('#par').value;

let form = document.querySelector('.calculator-form');


console.log("hello world")

form.addEventListener('submit', function(event){
    event.preventDefault();
    console.log(handicapIndex)
    console.log(courseRating)
})