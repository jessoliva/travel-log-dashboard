async function postFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const city = document.querySelector('#city').value.trim();
    const country = document.querySelector('#country').value.trim();
    const description = document.querySelector('#description').value.trim();
    const restaurants = document.querySelector('#restaurants').value.trim();
    const attractions = document.querySelector('#attractions').value.trim();
    const meal_cost = document.querySelector('#meal-cost').value.trim();
    const hotel_cost = document.querySelector('#hotel-cost').value.trim();
    const tips = document.querySelector('#tips').value.trim();
    const kid_friendly = document.querySelector('#kid-friendly').value.trim();
    const pet_friendly = document.querySelector('#pet-friendly').value.trim();
    const safety_rating = document.querySelector('#safety-rating').value.trim();

    if (title) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                city,
                country,
                description,
                restaurants,
                attractions,
                meal_cost,
                hotel_cost,
                tips,
                kid_friendly,
                pet_friendly,
                safety_rating
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/posts');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#create-post-btn').addEventListener('click', postFormHandler);