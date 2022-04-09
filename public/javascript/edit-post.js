const title = document.querySelector('#title');
const city = document.querySelector('#city');
const state_province = document.querySelector('#state_province');
const country = document.querySelector('#country');
const description = document.querySelector('#description');
const restaurants = document.querySelector('#restaurants');
const attractions = document.querySelector('#attractions');
const meal_cost = document.querySelector('#meal-cost');
const hotel_cost = document.querySelector('#hotel-cost');
const tips = document.querySelector('#tips');
const kid_friendly = document.querySelector('#kid-friendly');
const pet_friendly = document.querySelector('#pet-friendly');
const safety_rating = document.querySelector('#safety-rating');
const image_name = document.querySelector('#post-images');

async function generatePostData() {

    // find post ID from current post url
    const post_id = window.location.pathname.toString().split('/')[2];
    
    const post = await fetch(`api/posts/${post_id}`);

    city;
    state_province;
    country;
    description;
    restaurants;
    attractions;
    meal_cost;
    hotel_cost;
    tips;
    kid_friendly;
    pet_friendly;
    safety_rating;
    image_name;
    //image_name.files[0].name;


    // use selectedIndex for dropdown menu values
};

async function updateBtnHandler(event) {
    event.preventDefault();



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

document.querySelector("#update-post-btn").addEventListener('click', updateBtnHandler);

generatePostData();