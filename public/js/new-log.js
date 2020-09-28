const newLogNextBtn = document.getElementById("new-log-next-btn");
const formLogTechPage = document.getElementById("form-log-tech-page");
const formLogFeedbackPage = document.getElementById("form-log-feedback-page");

function goToNextPage() {
  formLogFeedbackPage.classList.toggle("hidden");
  formLogTechPage.classList.toggle("hidden");
}

newLogNextBtn.addEventListener("click", goToNextPage);
