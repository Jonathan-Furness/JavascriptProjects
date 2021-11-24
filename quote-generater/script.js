let apiQuotes = [];

// Get Quotes From API
async function getQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    const apiQuotes = await response.json();
  } catch (e) {
    // catch error
  }
}

getQuotes();