let flag = true;
let books = [
  {
    bookName: "The Great Gatsby",
    authorName: "F. Scott Fitzgerald",
    bookDescription:
      "A story of ambition, love, and the American Dream in the 1920s.",
    pagesNumber: 180,
  },
  {
    bookName: "To Kill a Mockingbird",
    authorName: "Harper Lee",
    bookDescription:
      "A powerful tale of justice and childhood innocence in the Deep South.",
    pagesNumber: 281,
  },
  {
    bookName: "1984",
    authorName: "George Orwell",
    bookDescription:
      "A dystopian masterpiece about surveillance, control, and totalitarism.",
    pagesNumber: 328,
  },
  {
    bookName: "The Hobbit",
    authorName: "J.R.R. Tolkien",
    bookDescription:
      "The adventure of Bilbo Baggins as he seeks to reclaim a lost kingdom.",
    pagesNumber: 310,
  },
  {
    bookName: "The Alchemist",
    authorName: "Paulo Coelho",
    bookDescription:
      "A philosophical journey of a shepherd boy following his dreams.",
    pagesNumber: 208,
  },
  {
    bookName: "Pride and Prejudice",
    authorName: "Jane Austen",
    bookDescription:
      "A classic romance exploring social standing and misunderstanding.",
    pagesNumber: 432,
  },
  {
    bookName: "The Catcher in the Rye",
    authorName: "J.D. Salinger",
    bookDescription:
      "A raw look at teenage angst and the search for authenticity.",
    pagesNumber: 234,
  },
  {
    bookName: "Dune",
    authorName: "Frank Herbert",
    bookDescription:
      "An epic sci-fi saga of politics, religion, and ecology on a desert planet.",
    pagesNumber: 412,
  },
  {
    bookName: "The Little Prince",
    authorName: "Antoine de Saint-Exupéry",
    bookDescription:
      "A poetic tale about life, love, and the wisdom of childhood.",
    pagesNumber: 96,
  },
  {
    bookName: "Brave New World",
    authorName: "Aldous Huxley",
    bookDescription:
      "A chilling vision of a future society shaped by genetic engineering.",
    pagesNumber: 268,
  },
];
function addBook() {
  const bookName = document.getElementById("bookName").value;
  const authorName = document.getElementById("authorName").value;
  const bookDescription = document.getElementById("bookDescription").value;
  const pagesNumber = parseFloat(document.getElementById("pagesNumber").value);

  if (bookName && authorName && bookDescription && !isNaN(pagesNumber)) {
    const book = {
      bookName: bookName,
      authorName: authorName,
      bookDescription: bookDescription,
      pagesNumber: pagesNumber,
    };
    console.log(book);
    books.push(book);
    showbooks();
    clearInputs();
    flag = true;
  } else {
    alert("Please fill in all fields correctly !");
    flag = false;
  }
}

function showbooks() {
  const booksDiv = books.map(
    (book, index) => `<div class="book-card">
        <h3>Book Number: ${index + 1}</h3>
        <p><strong>Book Name: </strong>${book.bookName}</p> 
        <p><strong>Author Name:</strong> ${book.authorName}</p>
        <p><strong>Book Description:</strong> ${book.bookDescription}</p>
        <p><strong>No. of Pages:</strong> ${book.pagesNumber} page(s)</p>
        <button onclick="editbook(${index})">Edit</button> 
        </div>`,
  );
  document.getElementById("books").innerHTML = booksDiv.join("");
}

function editbook(index) {
  if (flag) {
    const book = books[index];
    document.getElementById("bookName").value = book.bookName; // Fixed
    document.getElementById("authorName").value = book.authorName;
    document.getElementById("bookDescription").value = book.bookDescription;
    document.getElementById("pagesNumber").value = book.pagesNumber;

    books.splice(index, 1);
    flag = false;
  } else {
    alert("Update old one before update new one");
  }
  showbooks();
}
function clearInputs() {
  document.getElementById("bookName").value = "";
  document.getElementById("authorName").value = "";
  document.getElementById("bookDescription").value = "";
  document.getElementById("pagesNumber").value = "";
}
// Add this at the end of your book_system.js file
showbooks();
