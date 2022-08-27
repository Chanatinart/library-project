//data structures

let myLibrary = [];

class Book {
    constructor(title ,author ,pages ,status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

//user interface
const addBookBtn = document.getElementById('addBookBtn')
const addBookModal = document.getElementById('addBookModal')


//get add book modal
addBookBtn.onclick = function() {
    addBookModal.style.display = 'block';
}

window.addEventListener("click", function(e){
    if (e.target == addBookModal) {
        addBookModal.style.display = "none";
    }
});



    const titleInput = document.getElementById('title');
    const inputAuthor = document.getElementById('author');
    const inputPages = document.getElementById('pages');
    const status = document.getElementById('status');
    const tableBody = document.getElementById('book-table-body');
    const addBookForm = document.getElementById('addBookForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    reader();
    clearForm();
});

const table =  document.querySelector("table").addEventListener("click", (e) => {
    const currentTarget = e.target.parentNode.parentNode.childNodes[1];
    if (e.target.innerHTML === "delete") {
        if (confirm(`are you sure you want to delete ${currentTarget.innerText}`))
        deleteBook(findBook(myLibrary,currentTarget.innerText));
    }
    if (e.target.classList.contains("status-button")){
        changeStatus(findBook(myLibrary, currentTarget.innerText));
    }
    updateLocalStorage();
    reader();
});


function addBookToLibrary() {
    if (title.value.length === 0 || author.value.length === 0) {
        alert("Please, fill all the fields");
        return;
    }

    const newBook = new Book(title.value, author.value, pages.value, status.value);

    myLibrary.push(newBook);
    updateLocalStorage();
}

function changeStatus(book) {
    if (myLibrary[book].status === "read"){
        myLibrary[book].status = "not read";
    } else myLibrary[book].status = "read";
}

function deleteBook(currentBook) {
    myLibrary.splice(currentBook, currentBook + 1);
}

function findBook(myLibraryArray, title) {
    if (myLibraryArray.length === 0 || myLibraryArray === null) {
        return;
    }
    for (book of myLibraryArray)
    if (book.title === title) {
        return myLibraryArray.indexOf(book);
    }
}

function clearForm() {
    title.value = "";
    author.value = "";
}

// get book from local storage

function updateLocalStorage() {
    localStorage.getItem('myLibrary', JSON.stringify(myLibrary));
}

function checkLocalStorage() {
    if (localStorage.getItem('myLibrary')) {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    } else {
        myLibrary = '';
    }
}

function reader() {
    checkLocalStorage();
    tableBody.innerHTML = '';
    myLibrary.forEach((book) => {
        const htmlBook = `
        <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>{book.pages}</td>
        <td><button class = "status-button">${book.status}</button></td>
        <td><button class = "delete">delete</button></td>
        </tr>
        `;
        tableBody.insertAdjacentHTML('afterbegin', htmlBook);
    });
}

reader();
    
