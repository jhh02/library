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

class Book {
  static myLibrary = [];
  static bookNumber = 0;

  constructor(title, author, page, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read ? "Read" : "Not read";
  }

  static addABook = (e) => {
    if (title.value && author.value && pages.value) {
      const bookObj = new Book(
        title.value,
        author.value,
        pages.value,
        read.checked
      );
      this.myLibrary.push(bookObj);
      UI.resetUI();
      UI.displayBooks(bookObj);
    }
  };

  static removeBook = (e) => {
    this.bookNumber = 0;
    const removemBtn = e.target;
    removemBtn.parentElement.remove();
    this.myLibrary = this.myLibrary.filter(
      (_obj, index) => index !== Number(removemBtn.parentElement.id)
    );
    this.removeAllChildren(ul);
    this.myLibrary.forEach((obj) => {
      UI.displayBooks(obj);
    });
  };

  static removeAllChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  static toggleRead = (e) => {
    const toggleBtn = e.target;
    const parent = toggleBtn.parentElement;
    let toggleValue = toggleBtn.innerText;

    toggleValue === "Read"
      ? (toggleBtn.textContent = "Not read")
      : (toggleBtn.textContent = "Read");

    parent.firstChild.textContent === this.myLibrary[parent.id].title &&
    this.myLibrary[parent.id].read === "Read"
      ? (this.myLibrary[parent.id].read = "Not read")
      : (this.myLibrary[parent.id].read = "Read");
  };
}

class Modal {
  static toggleModal() {
    modal.classList.toggle("show-modal");
  }

  static clickOnWindow = (e) => {
    if (e.target === modal) {
      this.toggleModal();
    }
  };
}

class UI {
  static displayBooks(obj) {
    const [title, author, pages, read] = [
      obj.title,
      obj.author,
      obj.page,
      obj.read,
    ];
    const li = document.createElement("li");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    li.id = Book.bookNumber;
    li.classList.add("card");
    readBtn.classList.add("card-btn");
    removeBtn.classList.add("rm-btn");
    p1.innerText = "Title: " + title;
    p2.innerText = "Author: " + author;
    p3.innerText = "Pages: " + pages;
    readBtn.innerText = read;
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    li.appendChild(readBtn);
    li.appendChild(removeBtn);
    ul.appendChild(li);
    readBtn.addEventListener("click", Book.toggleRead);
    removeBtn.addEventListener("click", Book.removeBook);
    Book.bookNumber++;
  }

  static resetUI() {
    title.value = author.value = pages.value = "";
    read.checked = false;
  }
}

function init() {
  addBook.addEventListener("click", Modal.toggleModal);
  closeBtn.addEventListener("click", Modal.toggleModal);
  window.addEventListener("click", Modal.clickOnWindow);
  submit.addEventListener("click", Book.addABook);
}

init();
