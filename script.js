// ```javascript
function addQuote() {
  var quote = document.getElementById("quoteInput").value;
  var author = document.getElementById("authorInput").value;
  var quoteList = document.getElementById("quoteList");

  if (!quote || !author) {
    Swal.fire({
      title: 'يجب عليك ملأ الخانات أولًا',
      confirmButtonText: 'حسنًا'
    });
    return;
  }

  // Get the existing quotes from local storage or create an empty array
  var savedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  
  // Add the new quote to the array and save it back to local storage
  savedQuotes.push({
    quote: quote,
    author: author
  });
  localStorage.setItem("quotes", JSON.stringify(savedQuotes));

  // Create a new div to display the quote and a delete button
  var newQuoteItem = document.createElement("div");
  newQuoteItem.classList.add("quote-card");

  var quoteText = document.createElement("div");
  quoteText.innerText = quote;
  quoteText.classList.add("quote-text");
  newQuoteItem.appendChild(quoteText);

  var authorText = document.createElement("div");
  authorText.innerText = "- " + author;
  authorText.classList.add("author-text");
  newQuoteItem.appendChild(authorText);

  var deleteButton = document.createElement("div");
  deleteButton.innerHTML = '<ion-icon name="trash"></ion-icon>';
  deleteButton.classList.add("delete-button");
  deleteButton.onclick = createDeleteHandler(savedQuotes[savedQuotes.length - 1], newQuoteItem);
  newQuoteItem.appendChild(deleteButton);

  quoteList.appendChild(newQuoteItem);

  // Reset the input fields
  document.getElementById("quoteInput").value = "";
  document.getElementById("authorInput").value = "";
}

window.onload = function() {

  var savedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  
  if (savedQuotes.length > 0) {
    var randomIndex = Math.floor(Math.random() * savedQuotes.length);
    var quote = savedQuotes[randomIndex];
    Swal.fire({
      title: quote.quote,
      confirmButtonText: quote.author
    });
  }
  
  // Shuffle the savedQuotes array
  savedQuotes.sort(function() {
    return Math.random() - 0.5;
  });

  var quoteList = document.getElementById("quoteList");

  for (var i = 0; i < savedQuotes.length; i++) {
    var newQuoteItem = document.createElement("div");
    newQuoteItem.classList.add("quote-card");

    var quoteText = document.createElement("div");
    quoteText.innerText = savedQuotes[i].quote;
    quoteText.classList.add("quote-text");
    newQuoteItem.appendChild(quoteText);

    var authorText = document.createElement("div");
    authorText.innerText = "- " + savedQuotes[i].author;
    authorText.classList.add("author-text");
    newQuoteItem.appendChild(authorText);

    var deleteButton = document.createElement("div");
    deleteButton.innerHTML = '<ion-icon name="trash"></ion-icon>';
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = createDeleteHandler(savedQuotes[i], newQuoteItem);
    newQuoteItem.appendChild(deleteButton);
    quoteList.appendChild(newQuoteItem)
  }

}

// Helper function to create a delete handler function for each quote
function createDeleteHandler(quote, quoteItem) {
  
  return function() {

    Swal.fire({
      title: 'هل أنت متأكد من أنك تريد حذف هذه الفائدة؟',
      showConfirmButton: false,
      showCancelButton: true,
      showDenyButton: true,
      denyButtonText: `حذف`,
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isDenied) {
        // Remove the quote from the savedQuotes array and update local storage
        var savedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
        savedQuotes.splice(savedQuotes.indexOf(quote), 1);
        localStorage.setItem("quotes", JSON.stringify(savedQuotes));

        // Remove the quote item from the quote list
        quoteItem.remove();
      }
    });

  };
}

setInterval(() => {
  var savedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  var noQuotesMessage = document.getElementById("noQuotesMessage");
  if (savedQuotes.length === 0) {
    noQuotesMessage.style.display = "block";
  } else if (savedQuotes.length > 0) {
    noQuotesMessage.style.display = "none";
  }
})
/*
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}
*/
// ```