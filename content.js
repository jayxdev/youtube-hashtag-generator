chrome.runtime.sendMessage({ action: 'fetchSuggestions', searchText: 'bike' }, response => {
  if (response.suggestions) {
    console.log("Search Suggestions:", response.suggestions);
    // You can execute more code here using the fetched data and search suggestions
  } else if (response.error) {
    console.error('Error fetching suggestions:', response.error);
  }
});
