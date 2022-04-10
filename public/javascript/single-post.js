async function commentFormHandler(event) {
    event.preventDefault();

    console.log('testing');
    const text = document.querySelector('#comment-input').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#comment-btn').addEventListener('click', commentFormHandler);


function displayElements() {

    // get elements in places element 
    const placesEl = document.querySelector('#places');
    const placesTitle = document.querySelector('#places-p');

    const costEl = document.querySelector('#cost');
    const costTitle = document.querySelector('#cost-p');

    const bestEl = document.querySelector('#best-for');
    const bestTitle = document.querySelector('#best-p');

    // display all elements
    placesEl.classList.remove('d-none');
    placesTitle.classList.remove('d-none');
    costEl.classList.remove('d-none');
    costTitle.classList.remove('d-none');
    bestEl.classList.remove('d-none');
    bestTitle.classList.remove('d-none');

    // hide elements
    const placesElText = placesEl.textContent;
    // if places element is empty
    if (!placesElText.includes('Favorite Restaurants') && !placesElText.includes('Attractions')) {
        placesEl.classList.add('d-none');
        placesTitle.classList.add('d-none');
    }

    const costElText = costEl.textContent;
    if (!costElText.includes('Avg Cost Per Meal Per Person') && !costElText.includes('Avg Cost Per Night in Hotels/Airbnb')) {
        costEl.classList.add('d-none');
        costTitle.classList.add('d-none');
    }

    const bestElText = bestEl.textContent;
    if (!bestElText.includes('Pet Friendly') && !bestElText.includes('Kid Friendly') && !bestElText.includes('Safety Rating')) {
        bestEl.classList.add('d-none');
        bestTitle.classList.add('d-none');
    }
}
displayElements();