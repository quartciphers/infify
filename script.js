// 
const ImageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


const count =10;
const apikey ='fUbgFYSAwZ3lhSC_XtDlZ3Le8TmTGGUvxjkVwdav-yE';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apikey}&count=${count}`;


function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
    }
  }

//setAttributes 
function setAttributes(element,attributes){
    for (const key in attributes) {
       element.setAttribute(key,attributes[key]);
    }

}

// get photos
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // for each method 
    photosArray.forEach((photo) => {
       const item = document.createElement("a");
       setAttributes(item,{
           href : photo.links.html,
           target : '_blank'  
       })
       const img = document.createElement("img");
    setAttributes(img,{
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    })
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
       item.appendChild(img);
       ImageContainer.appendChild(item);
      
    });
}


// get photos from api
async function getphotos(){
    try {
        const response = await fetch(apiUrl);
         photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
      ready = false;
      getphotos();
    }
  });
//on Loader
getphotos();
