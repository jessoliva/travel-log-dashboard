async function postFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const location = document.querySelector('#location').value.trim();
    const description = document.querySelector('#description').value.trim();
    const restaurant = document.querySelector('#restaurant').value.trim();
    const attraction = document.querySelector('#attraction').trim();
    const meal_cost = document.querySelector('#meal-cost').value.trim();
    const hotel_cost = document.querySelector('#hotel-cost').value.trim();
    const tips = document.querySelector('#tips').value.trim();
    const kid_friendly = document.querySelector('#kidFriendly').value.trim();
    const pet_friendly = document.querySelector('#petFriendly').value.trim();
    const safety_rating = document.querySelector('#safetyRating').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (title) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
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

document.querySelector('#create-post-btn').addEventListener('click', postFormHandler);
