const newLogNextBtn = document.getElementById("new-log-next-btn");
const newLogBackBtn = document.getElementById("new-log-back-btn");
const formLogTechPage = document.getElementById("form-log-tech-page");
const formLogFeedbackPage = document.getElementById("form-log-feedback-page");

function changePage() {
  formLogFeedbackPage.classList.toggle("hidden");
  formLogTechPage.classList.toggle("hidden");
  newLogBackBtn.classList.toggle("hidden");
}

newLogNextBtn.addEventListener("click", changePage);
newLogBackBtn.addEventListener("click", changePage);
