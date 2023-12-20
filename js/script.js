// buttons and modal
const modal = document.querySelector(".modal");
const newBookButton = document.querySelector(".add-book");
const sendBookButton = document.querySelector(".send-form");
const closeModal = document.querySelector(".close-modal");

// form inputs
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookPages = document.getElementById("book-pages");
const bookReadStatus = document.getElementById("have-read");

const bookshelf = document.querySelector(".bookshelf");
const errorPanel = document.querySelector(".error-panel");

const myLibrary = [];

// constructor
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

// reset values everytime we create a new book
function resetValues() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookReadStatus.checked = false;
}

function createCard(book) {
    //create the card
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  //create card title
  const cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = `${book.title}`;

  //create card author
  const cardAuthor = document.createElement("div");
  cardAuthor.classList.add("card-author");
  cardAuthor.textContent = `${book.author}`;

  //create card pages
  const cardPages = document.createElement("div");
  cardPages.classList.add("card-pages");
  cardPages.textContent = `${book.pages}`;

  //create the state of cards
  const cardState = document.createElement("button");
  cardState.classList.add("card-state");
  cardState.textContent = `${book.readStatus === false ? "Read" : "Finished"}`;
  cardState.addEventListener("click", () => {
    if(cardState.classList.contains("finished")) {
        cardState.classList.remove("finished");
        book.readStatus = false;
        cardState.textContent = "Read";
    } else {
        cardState.classList.add("finished");
        book.readStatus = true;
        cardState.textContent = "Finished";
    }
  });

  //add green if it is finished
  if(book.readStatus) {
    cardState.classList.add("finished");
  }

  //create remove button
  const removeCard = document.createElement("button");
  removeCard.classList.add("remove-card");
  removeCard.textContent = `Remove`;
  removeCard.addEventListener("click", () => {
    bookCard.remove();
  })

  //append elements to card
  bookCard.appendChild(cardTitle);
  bookCard.appendChild(cardAuthor);
  bookCard.appendChild(cardPages);
  bookCard.appendChild(cardState);
  bookCard.appendChild(removeCard);

  //append card to the bookshelf
  bookshelf.appendChild(bookCard);
}

function verifyInput() {
    if(bookTitle.value.length >= 1 && bookAuthor.value.length >= 3 && bookPages.value > 10) {
        return true;
    }
    return false;
}

sendBookButton.addEventListener("click", () => {
    errorPanel.style.cssText = "display: none";
  if(verifyInput()) {
    const book = new Book(
        bookTitle.value,
        bookAuthor.value,
        bookPages.value,
        bookReadStatus.checked
      );
      addBookToLibrary(book);
      resetValues();
  } else {
    errorPanel.style.cssText = "display: flex";
    resetValues();
  }
});

function addBookToLibrary(book) {
  myLibrary.push(book);
  createCard(book);
}

