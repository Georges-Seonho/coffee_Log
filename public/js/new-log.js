const newLogNextBtn = document.getElementById("new-log-next-btn");
const newLogBackBtn = document.getElementById("new-log-back-btn");
const formLogTechPage = document.getElementById("form-log-tech-page");
const formLogFeedbackPage = document.getElementById("form-log-feedback-page");
const addNewCoffeeBtn = document.getElementById("add-new-coffee-btn");
const addNewCoffeePage = document.getElementById("add-new-coffee");
const formCoffee = document.getElementById("create-new-coffee");
const saveCoffeeSubmitBtn = document.getElementById("save-coffee-btn");
const flavorProfile = document.querySelectorAll(".flavorProfile");
const newCoffeeBackBtn = document.getElementById("new-coffee-back-btn");
const formContainer = document.getElementById("form-new-log");

function changePage() {
  formLogFeedbackPage.classList.toggle("hidden");
  formLogTechPage.classList.toggle("hidden");
  newLogBackBtn.classList.toggle("hidden");
}

function displayNewCoffeePage() {
  formLogTechPage.classList.toggle("hidden");
  addNewCoffeePage.classList.toggle("hidden");
  newCoffeeBackBtn.classList.toggle("hidden");
  formContainer.classList.toggle("hidden");
}

let newCoffee = {};

function createNewCoffeeObject(event) {
  const { name, value, type } = event.target;
  newCoffee[name] = value;

  let flavorProfileSelected = [];

  flavorProfile.forEach((profile) => {
    if (profile.checked) {
      let currentProfile = profile.value;
      flavorProfileSelected.push(currentProfile);
      console.log(flavorProfileSelected);
    }
  });
  newCoffee["flavorProfile"] = flavorProfileSelected;
  console.log(newCoffee);
}

function createCoffee(event) {
  event.preventDefault();
  // go back to new log page
  addNewCoffeePage.classList.toggle("hidden");
  formLogTechPage.classList.toggle("hidden");

  axios
    .post("/coffee/api/create", newCoffee)
    .then((result) => {
      console.log(result);
      const coffeesContainer = document.getElementById("coffee");
      const coffeeOption = createCoffeeNode(result.data);
      coffeesContainer.appendChild(coffeeOption);
      newCoffee = {};
    })
    .catch((apiError) => {
      console.log(apiError);
    });
}

function createCoffeeNode(coffee) {
  const option = document.createElement("option");
  option.value = coffee._id;
  option.textContent = coffee.name;
  return option;
}

newLogNextBtn.addEventListener("click", changePage);
newLogBackBtn.addEventListener("click", changePage);
addNewCoffeeBtn.addEventListener("click", displayNewCoffeePage);
newCoffeeBackBtn.addEventListener("click", displayNewCoffeePage);
saveCoffeeSubmitBtn.addEventListener("click", (event) => {
  createCoffee(event);
});

formCoffee.onchange = (event) => {
  createNewCoffeeObject(event);
};
