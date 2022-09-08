class Library{
    constructor(){
        this.books = [];
    }

    addBookToLibrary(event){
        event.preventDefault();
        const newBook = getBookData();
        if(isInLibrary(newBook)){
            myLibrary.push(newBook);
            createNewBookCard(newBook)
        }
    }
    
    deleteBook(title){
        this.books = this.books.filter((element) => element.title !== title);
        refreshGrid();
    }
    
    isInLibrary(newBook){
        return this.books.some((book) => book.title.toLowerCase() === newBook.title.toLowerCase())
    }

    toggleRead(book){

    }
}    


function Book(title, author, pages, bookIndex, finished){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.bookIndex = bookIndex
    this.finished = false;
}

const myLibrary = new Library;
const grid = document.querySelector(".grid");


//Modal variables and functions
const addBookBtn = document.querySelector('#addBookBtn');
const modalBG = document.querySelector('.modal-bg');
const modal = document.querySelector('#myModal');
const closeAddBook = document.querySelector('#closeAddBook');
addBookBtn.onclick = openAddBookModal;
closeAddBook.onclick = closeAddBookModal;

function openAddBookModal(){
    modalBG.style.display = "block";
    modal.style.display = "block";
}

function closeAddBookModal(){
    modalBG.style.display = "none";
    modal.style.display = "none";
}

function closeAddBookModal(){
    modalBG.style.display = "none";
    modal.style.display = "none";
}
//end modal related functions

//collect form data
const newBookForm = document.querySelector('#newBookForm');
newBookForm.addEventListener('submit', addBook);

function addBook(e){
    e.preventDefault();
    const newBook = getBookData();
    if(!(myLibrary.isInLibrary(newBook))){
        myLibrary.books.push(newBook);
        createNewBookCard(newBook);
    }else alert("Book already in Library!!")
}

function clearForm(e){
    
}

function getBookData(){
    const title = document.querySelector('#title').value.trim();
    const author = document.querySelector('#author').value.trim();
    const pages = document.querySelector('#bookPages').value.trim();
    const bookIndex = myLibrary.books.length;
    return new Book(title, author, pages, bookIndex);
}

//Build book card
function createNewBookCard(newBook){
    const divCard = document.createElement("div");
    const divCardInfo = document.createElement('div');
    const pTitle = document.createElement('p');
    const pAuthor = document.createElement('p');
    const divEditCard = document.createElement('div');
    const iTrashButton = document.createElement('i');
    const buttonReadToggle = document.createElement('button');

    pTitle.textContent = newBook['title'];
    pAuthor.textContent = newBook['author'];
    buttonReadToggle.textContent = 'Unread';

    
    divCard.setAttribute("data-index", newBook.bookIndex);
    divCard.classList.add('card');
    divCardInfo.classList.add('card-info');
    pTitle.classList.add('title');
    pAuthor.classList.add('author');
    divEditCard.classList.add('edit-card');
    iTrashButton.classList.add('fa-solid','fa-trash');
    buttonReadToggle.classList.add('readToggleUnread');

    document.querySelector(".card-container").appendChild(divCard);
    divCard.appendChild(divCardInfo)
    divCardInfo.appendChild(pTitle);
    divCardInfo.appendChild(pAuthor);
    divCard.appendChild(divEditCard);
    divEditCard.appendChild(iTrashButton);
    divEditCard.appendChild(buttonReadToggle);

    iTrashButton.addEventListener('click', deleteBook)
    buttonReadToggle.addEventListener('click', toggleRead);
}



function refreshGrid(){
    document.querySelector('.grid').innerHTML = "";
    myLibrary.books.forEach(createNewBookCard);
}

function toggleRead(e){
    
    let element = e.target.parentNode.parentNode;
    let index = element.getAttribute('data-index');
    let book = myLibrary.books[index];
    if(book['finished'] === false){
        book['finished'] = true;
        e.target.classList.add('readToggleRead');
        e.target.classList.remove('readToggleUnread');
        e.target.textContent = 'Read'
    } else{
        book['finished'] = false;
        e.target.classList.add('readToggleUnread');
        e.target.classList.remove('readToggleRead');
        e.target.textContent = 'Unread'
    }
}


function deleteBook(e){
    const title = e.target.parentNode.parentNode.firstChild.firstChild.textContent;
    myLibrary.deleteBook(title);
    e.target.parentNode.parentNode.remove();
}

