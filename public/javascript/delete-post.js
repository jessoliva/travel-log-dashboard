// async function deleteFormHandler(event) {
//     event.preventDefault();
  
//     const id = window.location.toString().split('/')[
//       window.location.toString().split('/').length - 1
//     ];

//     const response = await fetch(`/api/posts/${id}`, {
//       method: 'DELETE'
//     });
  
//     if (response.ok) {
//       document.location.replace('/my-posts');
//     } else {
//       alert(response.statusText);
//     }
// }
  
// document.querySelector('#delete-post-btn').addEventListener('click', deleteFormHandler);
  
async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    document.location.replace('/my-posts');
  } else {
    alert(response.statusText);
  }
};
document.querySelector('#delete-post').addEventListener('click', deleteFormHandler);

// modal element
const modalEl = document.querySelector('#generate-modal');

function displayModal() {
// display modal
modalEl.classList.add("show");
modalEl.classList.remove("hide");
};
document.querySelector('#delete-post-btn').addEventListener('click', displayModal);

function closeModal(event) {
event.preventDefault();

// close modal
modalEl.classList.add("hide");
modalEl.classList.remove("show");
}
document.querySelector('#close-modal').addEventListener('click', closeModal);
