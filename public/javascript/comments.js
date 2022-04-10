async function deleteFormHandler(event) {
    event.preventDefault();
    newId = event.target.getAttribute("data-commentid");
    const response2 = await fetch(`/api/comments/${newId}`, {
        method: 'DELETE'
    });
    if (response2.ok) {
        document.location.reload();
    } else {
        alert(response2.statusText);
    }

};



document.querySelector("#comments").addEventListener("click", deleteFormHandler);