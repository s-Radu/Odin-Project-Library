//? Global variables

const bookDetailsBtn = document.querySelectorAll(".more");
const hodeBookDetailsBtn = document.querySelectorAll(".less");

const dialog = document.getElementById("book-dialog");
const openButton = document.getElementById("add-book");
const submitBookBtn = document.getElementById("submit-book");
const closeButton = document.getElementById("close-button");

const bookNameInput = document.getElementById("book-name");
const bookAuthorInput = document.getElementById("book-author");
const bookQuoteInput = document.getElementById("quote");
const bookDescriptionInput = document.getElementById("description");
const pagesNumberInput = document.getElementById("pages");
const readBookInput = document.getElementById("book-read");

//> Book array
let readLibrary = [];
let notReadLibrary = [];

//? new book class constructor

class Book {
  constructor(name, author, quote, description, pages, read) {
    this.name = name;
    this.author = author;
    this.quote = quote;
    this.description = description;
    this.pages = pages;
    this.read = read;
  }
}

//* Functions

function addBookToLibrary(e) {
  e.preventDefault();

  if (formValidation()) {
    const bookName = bookNameInput.value;
    const bookAuthor = bookAuthorInput.value;
    let bookQuote = bookQuoteInput.value;
    let bookDescription = bookDescriptionInput.value;
    const pagesNumber = pagesNumberInput.value;
    const readBook = readBookInput.value;

    if (bookQuote.trim() === "") {
      bookQuote = "No quote provided";
    }
    if (bookDescription.trim() === "") {
      bookDescription = "No description provided";
    }

    const newBook = new Book(
      bookName,
      bookAuthor,
      bookQuote,
      bookDescription,
      pagesNumber,
      readBook
    );

    if (readBook === "yes") {
      readLibrary.push(newBook);
    } else if (readBook === "no") {
      notReadLibrary.push(newBook);
    }
    console.log(readBook);

    clearDialog();
    dialog.close();
    console.log(readLibrary);
    console.log(notReadLibrary);
  }
}

//* Form validation for number input

function setErrorFor(message) {
  const errorMessage = dialog.querySelector(".error-message");
  errorMessage.innerText = message;
}
function setSuccessFor() {
  const errorMessage = dialog.querySelector(".error-message");
  errorMessage.innerText = "";
}

function formValidation() {
  const bookNameValue = bookNameInput.value.trim();
  const bookAuthorValue = bookAuthorInput.value.trim();
  const bookNumberValue = pagesNumberInput.value.trim();

  const positiveIntegerRagex = /^\d+$/;

  if (bookNameValue === "") {
    setErrorFor("Book name cannot be blank");
    bookNameInput.focus();
  } else if (bookAuthorValue === "") {
    setErrorFor("Book author cannot be blank");
    bookAuthorInput.focus();
  } else if (bookNumberValue === "") {
    setErrorFor("Pages number cannot be blank");
    pagesNumberInput.focus();
  } else if (!positiveIntegerRagex.test(bookNumberValue)) {
    setErrorFor("Pages number must be a number");
    pagesNumberInput.focus();
    return false;
  } else {
    setSuccessFor();
    return true;
  }
}

function clearDialog() {
  bookNameInput.value = "";
  bookAuthorInput.value = "";
  bookQuoteInput.value = "";
  bookDescriptionInput.value = "";
  pagesNumberInput.value = "";
}

submitBookBtn.addEventListener("click", addBookToLibrary);

function showBookDetails(e) {
  const cardElement = e.target.closest(".card");
  const readButton = cardElement.querySelector(".read");
  const notReadButton = cardElement.querySelector(".not-read");
  const cardContent = cardElement.querySelector(".card-content");
  const bookDetails = cardElement.nextElementSibling;

  readButton.disabled = true;
  notReadButton.disabled = true;
  cardContent.classList.add("exits");
  cardContent.classList.remove("enters");

  bookDetails.classList.add("enters");
  bookDetails.classList.remove("exits");

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
    setTimeout(() => {
      prevSibling.classList.remove("blur-md");
    }, 1400);
  }
}

//! Event listeners

bookDetailsBtn.forEach((btn) => {
  btn.addEventListener("click", showBookDetails);
});

hodeBookDetailsBtn.forEach((btn) => {
  btn.addEventListener("click", hideBookDetails);
});

openButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  clearDialog();
  dialog.close();
});
