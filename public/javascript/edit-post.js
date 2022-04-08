const ogCity = document.querySelector('#city').value.trim();
const ogState_province = document.querySelector('#state_province').value.trim();
const ogCountry = document.querySelector('#country').value.trim();
const ogDescription = document.querySelector('#description').value.trim();
const ogRestaurants = document.querySelector('#restaurants').value.trim();
const ogAttractions = document.querySelector('#attractions').value.trim();
const ogMeal_cost = document.querySelector('#meal-cost').value.trim();
const ogHotel_cost = document.querySelector('#hotel-cost').value.trim();
const ogTips = document.querySelector('#tips').value.trim();
const ogKid_friendly = document.querySelector('#kid-friendly').value.trim();
const ogPet_friendly = document.querySelector('#pet-friendly').value.trim();
const ogSafety_rating = document.querySelector('#safety-rating').value.trim();
const ogImage_name = document.querySelector('#post-images').files[0].name;

async function updatePostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
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
    const image_name = document.querySelector('#post-images').files[0].name;

    // find post ID from current post url
    const post_id = window.location.pathname.toString().split('/')[2];

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ 
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
         }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace(`/posts/${post_id}`);
    } else {
        alert(response.statusText);
    }
};

document.querySelector("#update-post-btn").addEventListener('click', updatePostHandler);