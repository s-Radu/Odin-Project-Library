//? Global variables

const bookDetailsBtn = document.querySelectorAll(".more");
const hodeBookDetailsBtn = document.querySelectorAll(".less");

//* Functions

function showBookDetails(e) {
  const cardElement = e.target.closest(".card");
  const readButton = cardElement.querySelector(".read");
  const notReadButton = cardElement.querySelector(".not-read");
  const cardContent = cardElement.querySelector(".card-content");
  const bookDetails = cardElement.nextElementSibling;

  readButton.disabled = true;
  notReadButton.disabled = true;
  cardContent.classList.add("exits");
  bookDetails.classList.add("enters");

  setTimeout(() => {
    cardContent.classList.add("hidden");
    bookDetails.classList.remove("hidden");
  }, 800);

  cardElement.classList.add("blur-md");
}

function hideBookDetails(e) {
  let prevSibling = e.target.parentElement.previousElementSibling;
  if (prevSibling && prevSibling.classList.contains("card")) {
    const readButton = prevSibling.querySelector(".read");
    const notReadButton = prevSibling.querySelector(".not-read");
    const cardContent = prevSibling.querySelector(".card-content");
    const bookDetails = prevSibling.nextElementSibling;

    readButton.disabled = false;
    notReadButton.disabled = false;
    cardContent.classList.remove("exits");
    cardContent.classList.add("enters");

    bookDetails.classList.remove("enters");
    bookDetails.classList.add("exits");

    setTimeout(() => {
      cardContent.classList.remove("hidden");
      bookDetails.classList.add("hidden");
    }, 800);

    prevSibling.classList.remove("blur-md");
  }
}

//! Event listeners

bookDetailsBtn.forEach((btn) => {
  btn.addEventListener("click", showBookDetails);
});

hodeBookDetailsBtn.forEach((btn) => {
  btn.addEventListener("click", hideBookDetails);
});
