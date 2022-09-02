let myLibrary = [];

function Book(title, author, pages, pagesRead, bookIndex) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.pagesRead = pagesRead
    this.bookIndex = bookIndex
    this.finished = false;
}

Book.prototype.deleteBook = function(){

}

Book.prototype.createCard = function(){
    createNewBookCard(this);
}

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
newBookForm.addEventListener('submit', addBookToLibrary);

function getBookData(){
    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#bookPages').value;
    const pagesRead = document.querySelector('#pagesRead').value;
    const bookIndex = myLibrary.length;
    closeAddBookModal();
    return new Book(title, author, pages, pagesRead, bookIndex);
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
    buttonReadToggle.textContent = 'Read';

    
    divCard.setAttribute("data-index", newBook['bookIndex']);
    divCard.classList.add('card');
    divCardInfo.classList.add('card-info');
    pTitle.classList.add('title');
    pAuthor.classList.add('author');
    divEditCard.classList.add('edit-card');
    iTrashButton.classList.add('fa-solid','fa-trash');
    buttonReadToggle.classList.add('readToggle');

    document.querySelector(".card-container").appendChild(divCard);
    divCard.appendChild(divCardInfo);
    divCardInfo.appendChild(pTitle);
    divCardInfo.appendChild(pAuthor);
    divCard.appendChild(divEditCard);
    divEditCard.appendChild(iTrashButton);
    divEditCard.appendChild(buttonReadToggle);


}

function addBookToLibrary(event){
    event.preventDefault();
    const newBook = getBookData();
    myLibrary.push(newBook);
    newBook.createCard();
}