
var saveSearch = function (newSearch) {
    localStorage.setItem("currentSearch", JSON.stringify(newSearch));
}

function searchFormHandler(event) {
    event.preventDefault();

    const city = document.querySelector('#city').value.toLowerCase().trim();
    const country = document.querySelector('#country').value.toLowerCase().trim();
    let newSearch = { city, country };
    saveSearch(newSearch);
    document.location.replace('/posts');
}

document.querySelector('#user-form').addEventListener('submit', searchFormHandler);