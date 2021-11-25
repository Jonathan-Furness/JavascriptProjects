const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'r8z8B5AiKk3HgAxHyALiapOumBbopZI5RYp1rVfujwY';
const apiUrl = `https://api.unsplash.com/photos/random/?count=${count}&client_id=${apiKey}`;

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

function displayPhotos() {
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, { 
      'href': photo.links.html,
      '_target': '_blank'
    });
    
    const img = document.createElement('img')
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);
    setAttributes(img, { 
      'src': photo.urls.regular,
      'alt': photo.alt_description,
      'title': photo.alt_description
    })

    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}

// Get photos from unspalsh api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (e) {

  }
}

getPhotos();