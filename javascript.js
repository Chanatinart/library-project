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

//close modal
const closeAddBookModal = () => {
    addBookModal.style.display = "none";
}

const resetBook = () => {
    titleInput.value = ''; 
    inputAuthor.value = ''; 
    inputPages.value = ''; 
    status.checked = '';
}

// get book from local storage
if (localStorage.getItem('books')=== null) {
    myLibrary = [];
} else {
    const booksFromStorage = JSON.parse(localStorage.getItem('books'));
    myLibrary = booksFromStorage;
}

function showBookInLibrary() {
    //save to local storage
    localStorage.setItem('books', JSON.stringify(myLibrary));

    const bookList = document.querySelector('#book-table-body');
    bookList.textContent = '';
    for (let i = 0; i < myLibrary.length; i+= 1) {
        const bookRow = document.createElement('tr');
        bookRow.classList.add('book-info');
        bookList.appendChild(bookRow);

        //book title
        const bookTitle = document.createElement('td');
        bookTitle.textContent = myLibrary[i].title;
        bookRow.appendChild(bookTitle);

        //book author
       const bookAuthor = document.createElement('td');
        bookAuthor.textContent = myLibrary[i].author;
        bookRow.appendChild(bookAuthor);

        //book pages
        const bookPages = document.createElement('td');
        bookPages.textContent = myLibrary[i].pages;
        bookRow.appendChild(bookPages);

        //book status
        const bookStatus = document.createElement('td');
        const readBtn = document.createElement('button');
        if (readBtn.textContent = 'read') { 
            readBtn.classList.add('btn-green')

        } else {
            readBtn.textContent = 'Not read'
            readBtn.classList.add('btn-red')
        }
        bookStatus.appendChild(readBtn);
        bookRow.appendChild(bookStatus);

        //book remove
        const bookRemove = document.createElement('td');
        bookRemove.classList.add('btn', 'removeBtn');
        bookRemove.textContent = 'remove';
        bookRow.appendChild(bookRemove);
    }
}

function addBookToLibrary(title ,author ,pages ,status){
    const book = new Book(title ,author ,pages ,status);
    myLibrary.push(book);
    showBookInLibrary();
}


//form
    const titleInput = document.getElementById('title');
    const inputAuthor = document.getElementById('author');
    const inputPages = document.getElementById('pages');
    const status = document.getElementById('isRead');
    const tableBody = document.getElementById('book-table-body');
    const addBookForm = document.getElementById('addBookForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary(titleInput.value, inputAuthor.value, inputPages.value, status.value);
    resetBook();
    closeAddBookModal();
    });



function clickInput() {
    document.addEventListener('click', (e) => {
        const target = e
        const tr = e.target.parentNode.parentNode.rowIndex -1;
         if (e.target.classList.contains('removeBtn')) {
            myLibrary.splice(tr, 1);
        } else if (e.target.classList.contains ('btn-green')) {
            e.target.classList.remove('btn-green');
            e.target.classList.add('btn-red');
            myLibrary[tr].status = false;
        } else if (e.target.classList.contains ('btn-red')) {
            e.target.classList.remove('btn-red');
            e.target.classList.add('btn-green');
            myLibrary[tr].status = true;
    }
    showBookInLibrary();
});
}

showBookInLibrary();
clickInput();
    
