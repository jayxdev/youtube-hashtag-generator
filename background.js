chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed.');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchSuggestions') {
    const searchText = message.searchText;
    const apiUrl = `https://clients1.google.com/complete/search?client=youtube&gs_ri=youtube&ds=yt&q=${searchText}`;
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        const jsonData = data.match(/\[.*\]/)[0];
        const parsedData = JSON.parse(jsonData);
        console.log(parsedData);
        const searchSuggestions = parsedData[1].map(item => item[0]);
        sendResponse({ suggestions: searchSuggestions });
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        sendResponse({ error: error.message });
      });

    return true; // Indicates that sendResponse will be called asynchronously
  }
});
