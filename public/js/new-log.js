const newLogNextBtn = document.getElementById("new-log-next-btn");
const newLogBackBtn = document.getElementById("new-log-back-btn");
const formLogTechPage = document.getElementById("form-log-tech-page");
const formLogFeedbackPage = document.getElementById("form-log-feedback-page");
const addNewCoffeeBtn = document.getElementById("add-new-coffee-btn");
const addNewCoffeePage = document.getElementById("add-new-coffee");

const inputName = document.getElementById("coffee-name");
const inputCountry = document.getElementById("coffee-country");
const inputRegion = document.getElementById("coffee-region");
const inputAltitude = document.getElementById("coffee-altitude")

const saveCoffeeNewLogBtn = document.getElementById("save-coffee-new-log");
const saveCoffeeSubmitBtn = document.getElementById("save-coffee-btn");

function changePage() {
  formLogFeedbackPage.classList.toggle("hidden");
  formLogTechPage.classList.toggle("hidden");
  newLogBackBtn.classList.toggle("hidden");
}

function displayNewCoffeePage() {
  formLogTechPage.classList.toggle("hidden");
  addNewCoffeePage.classList.toggle("hidden");
  saveCoffeeNewLogBtn.classList.toggle("hidden");
  saveCoffeeSubmitBtn.classList.toggle("hidden");
}

function createCoffee() {
  // go back to new log page
  addNewCoffeePage.classList.toggle("hidden");
  formLogTechPage.classList.toggle("hidden");

  //loop through drying method, flavor and roast => if isChecked, save value into a const (ex: selectedRoast) => use it for the post request

  axios
    .post("/coffee/create", {
      name: inputName.value,
      country: inputCountry.value,
      region: inputRegion.value,
      altitude: inputAltitude.value
      // do this for all create coffee input...
    })
    .then((apiResponse) => {
      console.log(apiResponse);
      // add the new coffee to the list...
    })
    .catch((apiError) => {
      console.log(apiError);
    });
}

newLogNextBtn.addEventListener("click", changePage);
newLogBackBtn.addEventListener("click", changePage);
addNewCoffeeBtn.addEventListener("click", displayNewCoffeePage);
saveCoffeeNewLogBtn.addEventListener("click", createCoffee);
