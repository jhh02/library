const addBook = document.querySelector(".add");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");
const title = document.querySelector(".title input");
const author = document.querySelector(".author input");
const pages = document.querySelector(".pages input");
const read = document.querySelector(".read input");
const submit = document.querySelector(".submit input");
const bookcards = document.querySelector(".book-cards");
const ul = document.querySelector("ul");

let myLibrary = [];
let bookNumber = 0;

function Book(title, author, page, read) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read ? "Read" : "Not read";
}

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function clickOnWindow(e) {
  if (e.target === modal) {
    toggleModal();
  }
}

function getUserData() {
  const userData = [title.value, author.value, pages.value, read.checked];
  return userData;
}

function makeBookObj(title, author, page, read) {
  const obj = new Book(title, author, page, read);
  return obj;
}

function cleanUserInput() {
  title.value = author.value = pages.value = "";
  read.checked = false;
}

function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function removeBook(e) {
  bookNumber = 0;
  const rmBtn = e.target;
  rmBtn.parentElement.remove();
  myLibrary = myLibrary.filter(
    (obj, index) => index !== Number(rmBtn.parentElement.id)
  );
  removeChildren(ul);
  myLibrary.forEach((obj) => {
    displayOnScreen(obj);
  });
}

function toggleRead(e) {
  const parent = e.target.parentElement;
  let toggleVal = e.target.innerText;
  if (toggleVal === "Read") {
    e.target.textContent = "Not read";
  } else {
    e.target.textContent = "Read";
  }

  if (parent.firstChild.textContent === myLibrary[parent.id].title) {
    if (myLibrary[parent.id].read === "Read") {
      myLibrary[parent.id].read = "Not read";
    } else {
      myLibrary[parent.id].read = "Read";
    }
  }
}

function displayOnScreen(obj) {
  const title = obj.title;
  const author = obj.author;
  const pages = obj.page;
  const read = obj.read;
  const li = document.createElement("li");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const p4 = document.createElement("button");
  const remove = document.createElement("button");
  remove.innerText = "Remove";
  li.id = bookNumber;
  li.classList.add('card')
  p4.classList.add('card-btn')
  remove.classList.add('rm-btn')
  p1.innerText = "Title: " + title;
  p2.innerText = "Author: " + author;
  p3.innerText = "Pages: " + pages;
  p4.innerText = read;
  li.appendChild(p1);
  li.appendChild(p2);
  li.appendChild(p3);
  li.appendChild(p4);
  li.appendChild(remove);
  ul.appendChild(li);
  p4.addEventListener("click", toggleRead);
  remove.addEventListener("click", removeBook);
  bookNumber++;
}

function addBookToLibaray(e) {
  if(title.value && author.value && pages.value){
    const userData = getUserData();
    const bookObj = makeBookObj(
      userData[0],
      userData[1],
      userData[2],
      userData[3]
    );
    myLibrary.push(bookObj);
    cleanUserInput();
    displayOnScreen(bookObj);
  }
}

function init() {
  addBook.addEventListener("click", toggleModal);
  closeBtn.addEventListener("click", toggleModal);
  window.addEventListener("click", clickOnWindow);
  submit.addEventListener("click", addBookToLibaray);
}

init();
