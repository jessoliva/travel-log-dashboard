async function saveBtnHandler(event) {
    event.preventDefault();

    // finds post ID from current post url, since you can only save a post when viewing it
    const post_id = window.location.pathname.toString().split('/')[2];

    const response = await fetch('/api/posts/save', {
        method: 'PUT',
        body: JSON.stringify({ post_id }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log(response);
        document.location.replace('/saved-posts');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#save-post-btn').addEventListener('click', saveBtnHandler);