// find post ID from current post url
const post_id = window.location.pathname.toString().split('/')[2];

// input elements
let title = document.querySelector('#title');
let city = document.querySelector('#city');
let state_province = document.querySelector('#state_province');
let country = document.querySelector('#country');
let description = document.querySelector('#description');
let restaurants = document.querySelector('#restaurants');
let attractions = document.querySelector('#attractions');
let meal_cost = document.querySelector('#meal-cost');
let hotel_cost = document.querySelector('#hotel-cost');
let tips = document.querySelector('#tips');
let kid_friendly = document.querySelector('#kid-friendly');
let pet_friendly = document.querySelector('#pet-friendly');
let safety_rating = document.querySelector('#safety-rating');
let image_name = document.querySelector('#post-images');

async function getPostData() {
    fetch(`/api/posts/${post_id}`)
    .then(response => response.json())
    .then(postData => {
        generatePostData(postData);
    });
};

const generatePostData = function(post) {
    // find index for meal_cost
    if (post[0].meal_cost) {
        let option = post[0].meal_cost;
        switch(option) {
            case '$':
                meal_cost.selectedIndex = 1;
                break;
            case '$$':
                meal_cost.selectedIndex = 2;
                break;
            case '$$$':
                meal_cost.selectedIndex = 3;
                break;
            case '$$$$':
                meal_cost.selectedIndex = 4;
            default:
                break;
        }
    };

    // find index for hotel_cost
    if (post[0].hotel_cost) {
        let option = post[0].hotel_cost;
        switch(option) {
            case "$":
                hotel_cost.selectedIndex = 1;
                break;
            case "$$":
                hotel_cost.selectedIndex = 2;
                break;
            case "$$$":
                hotel_cost.selectedIndex = 3;
                break;
            case "$$$$":
                hotel_cost.selectedIndex = 4;
            default:
                break;
        }
    };

    // find index for kid_friendly
    if (post[0].kid_friendly) {
        let option = post[0].kid_friendly;
        switch(option) {
            case "yes":
                kid_friendly.selectedIndex = 1;
                break;
            case "no":
                kid_friendly.selectedIndex = 2;
            default:
                break;
        }
    };

    // find index for pet_friendly
    if (post[0].pet_friendly) {
        let option = post[0].pet_friendly;
        switch(option) {
            case "yes":
                pet_friendly.selectedIndex = 1;
                break;
            case "no":
                pet_friendly.selectedIndex = 2;
            default:
                break;
        }
    };

    // find index for safety_rating
    if (post[0].safety_rating) {
        let option = post[0].safety_rating;
        switch(option) {
            case "ok":
                safety_rating.selectedIndex = 1;
                break;
            case "dangerous":
                safety_rating.selectedIndex = 2;
            default:
                break;
        }
    };

    title.value = post[0].title;
    city.value = post[0].city;
    state_province.value = post[0].state_province;
    country.value = post[0].country;
    description.value = post[0].description;
    restaurants.value = post[0].restaurants;
    attractions.value = post[0].attractions;
    tips.value = post[0].tips;
    // image_name = post[0].image_name;
};

async function updateBtnHandler(event) {
    event.preventDefault();

    let new_title = document.querySelector('#title').value.trim();
    let new_city = document.querySelector('#city').value.trim();
    let new_state_province = document.querySelector('#state_province').value.trim();
    let new_country = document.querySelector('#country').value.trim();
    let new_description = document.querySelector('#description').value.trim();
    let new_restaurants = document.querySelector('#restaurants').value.trim();
    let new_attractions = document.querySelector('#attractions').value.trim();
    let new_meal_cost = document.querySelector('#meal-cost').value.trim();
    let new_hotel_cost = document.querySelector('#hotel-cost').value.trim();
    let new_tips = document.querySelector('#tips').value.trim();
    let new_kid_friendly = document.querySelector('#kid-friendly').value.trim();
    let new_pet_friendly = document.querySelector('#pet-friendly').value.trim();
    let new_safety_rating = document.querySelector('#safety-rating').value.trim();
    // get name of file uploaded
    // let new_image_name = document.querySelector('#post-images').files[0].name;

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ 
            new_title,
            new_city,
            new_state_province,
            new_country,
            // new_image_name,
            new_description,
            new_restaurants,
            new_attractions,
            new_meal_cost,
            new_hotel_cost,
            new_tips,
            new_kid_friendly,
            new_pet_friendly,
            new_safety_rating
         }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        // document.location.replace(`/posts/${post_id}`);
        response.json();
        console.log(response);
    } else {
        alert(response.statusText);
    }
};

document.querySelector("#update-post-btn").addEventListener('click', updateBtnHandler);

getPostData();