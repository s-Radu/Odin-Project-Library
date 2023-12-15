//? Global variables

const bookDetailsBtn = document.querySelectorAll(".more");

//* Functions

function showBookDetails(e) {
  const cardElement = e.target.closest(".card");
  const readButton = cardElement.querySelector(".read");
  const notReadButton = cardElement.querySelector(".not-read");
  readButton.disabled = true;
  notReadButton.disabled = true;
  cardElement.classList.add("blur-md");
}

//! Event listeners

bookDetailsBtn.forEach((btn) => {
  btn.addEventListener("click", showBookDetails);
});
