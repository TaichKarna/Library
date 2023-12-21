const books = [];

const library = document.querySelector("tbody");

function book(title,author,noOfPages,read)
{
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.read = read;
    let text = ""
    
    read? text="read": text="not read yet"

    this.info = () => ( `${this.title} by ${this.author}, ${this.noOfPages} pages, ${text}`)   
}

function addToLibrary(book)
{   
    let index = books.indexOf(book);

    const row = document.createElement("tr");
    row.setAttribute("id",`book${index}`)

    const title = document.createElement("td");
    title.textContent = `${book.title}`
    row.appendChild(title);

    const author = document.createElement("td");
    author.textContent = `${book.author}`
    row.appendChild(author);

    const pages = document.createElement("td");
    pages.textContent = `${book.noOfPages}`
    row.appendChild(pages);

    const status = document.createElement("td");
    if(book.read)
    {   const image = document.createElement("img")
        image.setAttribute("src","./images/check.svg")
        status.appendChild(image);
    }
    else
    {
        const image = document.createElement("img")
        image.setAttribute("src","./images/alpha-x.svg")
        status.appendChild(image);
    }
    row.appendChild(status);

    const remove = document.createElement("td");
    const removeImage = document.createElement("img")
    removeImage.setAttribute("src","./images/delete.svg")
    remove.appendChild(removeImage);       
    row.appendChild(remove);

    //add event listener to removeImage
    library.appendChild(row);

}




///get data from form and add new book
const table = document.querySelector('.library');

const addBook = document.querySelector(".add-book");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const checkbox = document.querySelector("#read");

///main display and delete all button
const totalBooks = document.querySelector(".total-books");
const booksRead = document.querySelector(".books-read");
const notReadBooks = document.querySelector(".books-unread");
const deleteAll = document.querySelector(".delete-all");

addBook.addEventListener('click',(event)=>
{
    const newBook = new book(title.value, author.value , pages.value , checkbox.checked);   
    books.push(newBook);
    addToLibrary(newBook);
    updateDisplay();
}
);

function updateDisplay()
{
    totalBooks.innerHTML = "Total books: " + getBookCount();
    booksRead.innerHTML = "Books Read: " + getReadCount();
    notReadBooks.innerHTML = "Books Not Read: " + notRead(); 
}

const form = document.querySelector('form');

form.addEventListener('submit',(event)=>
{
    event.preventDefault();
});

//update the displayed values

function getBookCount()
{
    let count = 0;
    for(let book of books)
    {
        count++;
    }

    return count;
}

function getReadCount()
{
    let count = 0;
    for(let book of books)
    {
        if(book.read)
        {
            count++;
        }
    }
    return count;
}
const notRead = function()
{
    let notReadCount = getBookCount() - getReadCount() ;
    return notReadCount;
}

//Update indexes each time a book is removed from library

function updateIndexes()
{   
    let collection = document.querySelector('tbody').children;
    let length = collection.length;

    for(let i = 0;i<length;i++)
    {
        collection[i].setAttribute('id',`book${i}`);
        
    }
}


table.addEventListener('click',function handleClick(event)
{
    let col = event.target.parentNode.cellIndex;
    let row = event.target.parentNode.parentNode.rowIndex;

    if(col== 4 && row>0)
    {
        const parent = event.target.parentElement.parentElement;
        console.log(parent);
        library.removeChild(parent);

        books.splice(row-1,1);

        updateIndexes();
        updateDisplay();
    }


    if(col== 3 && row>0)
    {   
        const status = books[row-1].read;
        console.log(status);

        if(status)
        {
            books[row-1].read = false;
            const image = event.target;
            image.setAttribute("src","./images/alpha-x.svg")

        }
        else
        {
            books[row-1].read = true;
            const image = event.target;
            console.log(image)
            image.setAttribute("src","./images/check.svg")
        }
        
    }
});

//delete all button

deleteAll.addEventListener('click',(event)=>
{
    library.replaceChildren();

    while(books.length!=0)
    {
        books.pop();
    }
    updateDisplay();
});
