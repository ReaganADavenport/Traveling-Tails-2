"use strict"

const firstButton =document.querySelector('#first-page-button');
const hotelsButton =document.querySelector('#hotels-button');
const parksButton =document.querySelector('#parks-button');
const vetsButton =document.querySelector('#vets-button');
const storesButton =document.querySelector('#stores-button');
const restaurantButton =document.querySelector('#restaurant-button');
const homeText =document.querySelector('.home-text');

const secondPage = document.querySelector('#second-page');
const firstPage = document.querySelector('#inner-body-wrapper');
const dogImage = document.querySelector('.image-dog2');


let screenHeight = window.visualViewport.height;
let screenWidth = window.visualViewport.width;
//Bending the title
//Credit to: https://appendto.com/2016/09/how-to-make-circularcurved-text-with-javascript/
// circularText("                 Traveling Tails", 230, 0);
function circularText(txt, radius, classIndex) {
  txt = txt.split(""),
    classIndex = document.getElementsByClassName("circTxt")[classIndex];

  let deg = 360 / txt.length,
    origin = 86;

  txt.forEach((ea) => {
    ea = `<p style='height:${radius}px;position:absolute;transform:rotate(${origin}deg);transform-origin:0 100%'>${ea}</p>`;
    classIndex.innerHTML += ea;
    origin += deg;
  });
}

//Making it fit larger screen size
if (screenWidth >= 1000) {
    circularText("                  Traveling Tails", 400, 0);
} else if (screenWidth < 1000) {
    circularText("                 Traveling Tails", 230, 0);
};

//Button for search bar
firstButton.addEventListener('click', function(e){
    console.log(screenWidth);
    //Checks to see if the search-bar is empty
    if (document.querySelector('#search-bar').value === ''){
        //if it is send an alert asking the user for a zip code then reset the page
        alert('Enter a valid location.');
        secondPage.style.display = 'block';
        firstPage.style.display = 'none';
    } else {
        //otherwise, run as normal
        e.preventDefault;
        setHotelLocations();
    }
    
    // toggle(secondPage);
    if (secondPage.style.display === 'none') {
        secondPage.style.display = 'block';
        firstPage.style.display = 'none';
    } else {
        secondPage.style.display = 'none';
        firstPage.style.display = 'block';
    } 
});

//Click functions for the locations buttons
parksButton.addEventListener('click', function(e) {
    e.preventDefault;
    setParkLocations();
});

hotelsButton.addEventListener('click', function(e) {
    e.preventDefault;
    setHotelLocations();
});

vetsButton.addEventListener('click', function(e) {
    e.preventDefault;
    setVetLocations();
});

storesButton.addEventListener('click', function(e) {
    e.preventDefault;
    setStoreLocations();
});

restaurantButton.addEventListener('click', function(e) {
    e.preventDefault;
    setRestaurantLocations();
});

//Adding click function to HOME text
homeText.addEventListener('click', function(e){
    e.preventDefault;
    // toggle(secondPage);
    if (firstPage.style.display === 'none') {
        firstPage.style.display = 'block';
        secondPage.style.display = 'none';
    }     
});

//Dog Quote Portion
dogImage.addEventListener('click', function(e) {
    e.preventDefault;
        dogQuote(); 
});

