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
        if (bookStatus.textContent = 'read') { 
            bookStatus.classList.add('btn-green')

        } else {
            bookStatus.textContent = 'Not read'
            bookStatus.classList.add('btn-red')
        }
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
    const status = document.getElementById('status');
    const tableBody = document.getElementById('book-table-body');
    const addBookForm = document.getElementById('addBookForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary(titleInput.value, inputAuthor.value, inputPages.value, status.value);
    addBookForm.reset();
    });


// function clickInput() {
//     document.addEventListener('click', (e) => {
//         const target = e;
//         const tr = target.parentNode.parentNode.rowIndex - 1;
//         if (target.id === 'addBookForm') {
//             addBookToLibrary(titleInput.value, inputAuthor.value, inputPages.value, status.value);
//     addBookForm.reset();

//          if (target.classList.contains ('removeBtn')) {
//             myLibrary.splice(tr, 1);
//         } else if (target.classList.contains ('read')) {
//             target.classList.remove('read');
//             target.classList.add('btn-red');
//         } else if (target.classList.contains ('btn-red')) {
//             target.classList.remove('btn-red');
//             target.classList.add('read');
//     }
//     showBookInLibrary();
// });
// }

// showBookInLibrary();
// clickInput();

    
