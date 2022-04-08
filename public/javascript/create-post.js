async function postFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
<<<<<<< HEAD
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
=======
    const city = document.querySelector('#city').value.trim();
    const state_province = document.querySelector('#state_province').value.trim();
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
    // get name of file uploaded
    const image_name = document.querySelector('#post-images').files[0].name;

    console.log(safety_rating);
>>>>>>> dev/jess-merge

    if (title) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
<<<<<<< HEAD
                post_id,
                comment_text
=======
                title,
                city,
                state_province,
                country,
                image_name,
                description,
                restaurants,
                attractions,
                meal_cost,
                hotel_cost,
                tips,
                kid_friendly,
                pet_friendly,
                safety_rating
>>>>>>> dev/jess-merge
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
<<<<<<< HEAD
            document.location.reload();
=======
            document.location.replace('/my-posts');
>>>>>>> dev/jess-merge
        } else {
            alert(response.statusText);
        }
    }
<<<<<<< HEAD
}
=======
};
>>>>>>> dev/jess-merge

document.querySelector('#create-post-btn').addEventListener('click', postFormHandler);
