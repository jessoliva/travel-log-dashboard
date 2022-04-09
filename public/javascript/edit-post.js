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

async function generatePostData() {

    // find post ID from current post url
    const post_id = window.location.pathname.toString().split('/')[2];
    
    const post = await fetch(`/api/posts/${post_id}`)
    .then(response => response.json());

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
    image_name;
    //image_name.files[0].name;

    console.log(post);

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