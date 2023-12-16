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

//* Read and not read sections
const readSection = document.getElementById("read");
const notReadSection = document.getElementById("not-read");

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

//< Build the library back when window is refreshed

window.onload = function () {
  readLibrary = JSON.parse(localStorage.getItem("readLibrary")) || [];
  notReadLibrary = JSON.parse(localStorage.getItem("notReadLibrary")) || [];

  readLibrary.forEach((book) => createBookCard(book, true));
  notReadLibrary.forEach((book) => createBookCard(book, false));
};

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
      let lastReadLibraryBook = readLibrary[readLibrary.length - 1];
      localStorage.setItem("readLibrary", JSON.stringify(readLibrary));
      createBookCard(lastReadLibraryBook, true);
    } else if (readBook === "no") {
      notReadLibrary.push(newBook);
      let lastNotReadLibraryBook = notReadLibrary[notReadLibrary.length - 1];
      localStorage.setItem("notReadLibrary", JSON.stringify(notReadLibrary));
      createBookCard(lastNotReadLibraryBook, false);
    }

    clearDialog();
    dialog.close();
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

function showBookDetails(e) {
  const cardElement = e.target.closest(".card");
  const readButton = cardElement.querySelector(".read");
  const notReadButton = cardElement.querySelector(".not-read");
  const cardContent = cardElement.querySelector(".card-content");
  const bookDetails = cardElement.nextElementSibling;

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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createBookCard(book, isRead) {
  const newBookCard = document.createElement("div");
  newBookCard.className =
    "p-4 transition ease-in-out delay-75 duration-200 min-h-card relative book";

  newBookCard.innerHTML = `
  <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden card">

      <div class="h-full p-6 flex flex-col justify-between card-content">
          <div class="book-info">
              <h1 class="text-5xl text-center m-10 border-b-2 border-gray-400 p-1 book-title">${capitalizeFirstLetter(
                book.name
              )}</h1>
              <h2 class="tracking-widest text-center text-xl font-medium text-gray-200 mb-3">Author</h2>
              <h2
                  class="tracking-widest text-center text-2xl font-medium text-gray-200 mb-1 border-b-2 border-gray-400">
                  ${capitalizeFirstLetter(book.author)}</h2>
          </div>
          <div class="flex justify-between m-2">
              <p class="text-sm text-left"> Pages: </p>
              <p class="number-of-pages text sm text-right">${book.pages}</p>
          </div>

          <div class="quote-section border-2 border-gray-400 rounded-2xl m-2 mt-10">
              <h2 class="text-center text-2xl font-medium text-gray-200 mb-1 border-gray-400 m-2 ">
                  Quote</h2>
              <p class="text-left indent-6 pb-4 m-4 font-medium text-gray-200 mb-1 border-gray-400 italic font-nunito
              before:quote-content after:quote-content ">
                  ${capitalizeFirstLetter(book.quote)}
              </p>
          </div>

          <div class="flex flex-col">
              <div class="flex gap-4  mx-auto justify-around align-center m-10 ">
                  <button
                      class="read bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-20">Read</button>
                  <button
                      class="remove  bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded w-20  ">Remove</button>
              </div>

              <div class="flex items-center justify-self-end">
                  <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer more">
                      More
                      <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                          fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                      </svg>
                  </a>
                  <span
                      class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none"
                          stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                      </svg>${randomNumber(9)}.${randomNumber(9)}K
                  </span>
                  <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none"
                          stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                          <path
                              d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                          </path>
                      </svg>${randomNumber(1000)}
                  </span>
              </div>
          </div>
      </div>
  </div>
  <div class="flex flex-col h-full justify-center items-center m-4  book-details hidden absolute top-0 ">
      <p class="first-line:uppercase first-line:tracking-widest
      first-letter:text-7xl first-letter:font-bold
      first-letter:mr-3 first-letter:float-left m-4
    ">
          ${capitalizeFirstLetter(book.description)}
      </p>
      <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer less">
          Less
          <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14"></path>
              <path d="M19 12l-7 7-7-7"></path>
          </svg>
      </a>
  </div>

  `;
  if (isRead) {
    readSection.appendChild(newBookCard);
  } else {
    notReadSection.appendChild(newBookCard);
  }
}

function randomNumber(num) {
  return Math.floor(Math.random() * num + 1);
}

function removeBook(e) {
  const bookElement = e.target.closest(".book");
  if (!bookElement) {
    console.error("Book element not found");
    return;
  }
  const bookTitleElement = bookElement.querySelector(".book-title");
  if (!bookTitleElement) {
    console.error("Book title element not found");
    return;
  }

  const bookTitle = bookTitleElement.textContent.toLowerCase();

  readLibrary = readLibrary.filter((book) => book.name !== bookTitle);
  notReadLibrary = notReadLibrary.filter((book) => book.name !== bookTitle);

  localStorage.setItem("readLibrary", JSON.stringify(readLibrary));
  localStorage.setItem("notReadLibrary", JSON.stringify(notReadLibrary));

  bookElement.remove();
}

//! Event listeners

document.addEventListener("click", function (e) {
  if (e.target.matches(".more")) {
    showBookDetails(e);
  } else if (e.target.matches(".less")) {
    hideBookDetails(e);
  }
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".remove")) {
    removeBook(e);
  }
});

openButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  clearDialog();
  dialog.close();
});

submitBookBtn.addEventListener("click", addBookToLibrary);
