document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const suggestionsDiv = document.getElementById('suggestions');

  searchButton.addEventListener('click', function () {
    const searchText = searchInput.value.trim();
    if (searchText) {
      chrome.runtime.sendMessage({ action: 'fetchSuggestions', searchText: searchText }, response => {
        if (response.suggestions) {
          displaySuggestions(response.suggestions);
        } else if (response.error) {
          suggestionsDiv.innerHTML = `<p>Error fetching suggestions: ${response.error}</p>`;
        }
      });
    }
  });

  function displaySuggestions(suggestions) {
    suggestionsDiv.innerHTML = '';
    const ul = document.createElement('ul');
    suggestions.forEach(suggestion => {
      const li = document.createElement('li');
      li.textContent = "# " + suggestion;
      ul.appendChild(li);
    });
    suggestionsDiv.appendChild(ul);
  }
});
