const form = document.querySelector(".calculator-form");


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
console.log("this is working")
  }).catch( (err) => {
    console.log(err)
  });
});
