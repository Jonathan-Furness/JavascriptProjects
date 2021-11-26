const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'YOUR_ACCESS_CODE';
const apiUrl = `https://api.unsplash.com/photos/random/?count=${count}&client_id=${apiKey}`;


function checkIfImageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
  }
}


function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

function displayPhotos() {
  totalImages = photosArray.length + totalImages;
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, { 
      href: photo.links.html,
      _target: '_blank'
    });
    
    const img = document.createElement('img')
    setAttributes(img, { 
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    })
    img.addEventListener('load', checkIfImageLoaded)

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

// Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000
    && ready) {
    ready = false;
    getPhotos();
  }
})

getPhotos();