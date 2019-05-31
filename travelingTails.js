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

function dogQuote() {
    const dogInfo = 'https://my-little-cors-proxy.herokuapp.com/https://dog-api.kinduff.com/api/facts?number=1';
    const dogText = document.querySelector('.dog-blurb-style');
    get(dogInfo)
    .then(function(response) {
        dogText.innerHTML = response.facts;   
    });
}


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

async function get(url){
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "ZERO_RESULTS"){
            alert('Enter a valid location.');
            secondPage.style.display = 'none';
            firstPage.style.display = 'block';
        } else {
            return data;
        }
    }
    catch(error){
        console.log(error.message);
    }

}

//Function to grab and return the data
// function get(url) {
//     return fetch(url)
//         .then(function(response) {
//             return response.json()
//         })
//         .then(function(data) {
//             if (data.status === "ZERO_RESULTS"){
//                 alert('Enter a valid location.');
//                 secondPage.style.display = 'none';
//                 firstPage.style.display = 'block';
//             } else {
//                 return data;
//             } 
//         })
//         .catch(function(error) {
//             return error;
//         });
// };

function setHotelLocations() {
    // Grabbing the user input
    const locationInput = document.querySelector('#search-bar').value;
    // Grabbing the API library for hotels and inputing the user input 
    let hotelInfo = `https://my-little-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels-in-${locationInput}&key=AIzaSyBdsm65ywFiu-1TK-v03CKyD03g3T4i0AA&type=other_pet_services`;
    //Adding in the hotel icon 
    let hotelIcon = document.createElement('img');
    hotelIcon.src = "Images/dog-pawprint-in-a-house.png";

    get(hotelInfo)
    .then(function(response) {
        const results = response.results;
        let latArray = [];
        let longArray = [];
        let nameArray = [];
        let rateArray = [];
        results.forEach((result) => {
            // console.log("result is", result);
            const lat = Number(result.geometry.location.lat);
            const long = Number(result.geometry.location.lng);
            const name = String(result.name);
            const rate = String(result.rating);
            latArray.push(lat);
            longArray.push(long);
            nameArray.push(name);
            rateArray.push(rate);
        });
    return [latArray, longArray, nameArray, rateArray];
    })

    .then(function(coordArray) {
        const latArray = coordArray[0];
        const longArray = coordArray[1];
        const nameArray = coordArray[2];
        const rateArray = coordArray[3];
        const iconImage = hotelIcon.src;
        markPlaces(nameArray,rateArray,latArray,longArray,latArray,longArray,iconImage);
        });

};

function setParkLocations() {
    // Grabbing the user input
    const locationInput = document.querySelector('#search-bar').value;

    // Grabbing the API library for parks and inputing the user input
    let parksInfo= `https://my-little-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=parks-in-${locationInput}&key=AIzaSyBdsm65ywFiu-1TK-v03CKyD03g3T4i0AA&type=other_pet_services`;
    //Adding in the park icon 
    let parkIcon = document.createElement('img');
    parkIcon.src = "Images/tennis-ball.png";

    get(parksInfo)
    .then(function(response) {
        const results = response.results;
        let latArray = [];
        let longArray = [];
        let nameArray = [];
        let rateArray = [];
        results.forEach((result) => {
            // console.log("result is", result);
            const lat = Number(result.geometry.location.lat);
            const long = Number(result.geometry.location.lng);
            const name = String(result.name);
            const rate = String(result.rating);
            latArray.push(lat);
            longArray.push(long);
            nameArray.push(name);
            rateArray.push(rate);
        });
    return [latArray, longArray,nameArray,rateArray];
    })

    .then(function(coordArray) {
        const latArray = coordArray[0];
        const longArray = coordArray[1];
        const nameArray = coordArray[2];
        const rateArray = coordArray[3];
        const iconImage = parkIcon.src;
        markPlaces(nameArray,rateArray,latArray,longArray, latArray,longArray,iconImage);
        });

};


function setVetLocations() {
    // Grabbing the user input
    const locationInput = document.querySelector('#search-bar').value;

    // Grabbing the API library for vets and inputing the user input
    let vetsInfo= `https://my-little-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=vets-in-${locationInput}&key=AIzaSyBdsm65ywFiu-1TK-v03CKyD03g3T4i0AA&type=other_pet_services`;
    //Setting and creating icon
    let vetIcon = document.createElement('img');
    vetIcon.src = "Images/cardiogram.png";

    get(vetsInfo)
    .then(function(response) {
        const results = response.results;
        let latArray = [];
        let longArray = [];
        let nameArray = [];
        let rateArray = [];
        results.forEach((result) => {
            // console.log("result is", result);
            const lat = Number(result.geometry.location.lat);
            const long = Number(result.geometry.location.lng);
            const name = String(result.name);
            const rate = String(result.rating);
            latArray.push(lat);
            longArray.push(long);
            nameArray.push(name);
            rateArray.push(rate);
        });
    return [latArray, longArray,nameArray,rateArray];
    })

    .then(function(coordArray) {
        const latArray = coordArray[0];
        const longArray = coordArray[1];
        const nameArray = coordArray[2];
        const rateArray = coordArray[3];
        const iconImage = vetIcon.src;
        markPlaces(nameArray,rateArray,latArray,longArray, latArray,longArray, iconImage);
        });

};


function setStoreLocations() {
    // Grabbing the user input
    const locationInput = document.querySelector('#search-bar').value;

    // Grabbing the API library for parks and inputing the user input
    let storesInfo= `https://my-little-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=pet-stores-in-${locationInput}&key=AIzaSyBdsm65ywFiu-1TK-v03CKyD03g3T4i0AA&type=other_pet_services`;

    //Setting and creating icon
    let storeIcon = document.createElement('img');
    storeIcon.src = "Images/animal-paw-print.png";
    storeIcon.classList.add('.icon-stylez');

    get(storesInfo)
    .then(function(response) {
        const results = response.results;
        let latArray = [];
        let longArray = [];
        let nameArray = [];
        let rateArray = [];
        results.forEach((result) => {
            // console.log("result is", result);
            const lat = Number(result.geometry.location.lat);
            const long = Number(result.geometry.location.lng);
            const name = String(result.name);
            const rate = String(result.rating);
            latArray.push(lat);
            longArray.push(long);
            nameArray.push(name);
            rateArray.push(rate);
        });
    return [latArray, longArray,nameArray,rateArray,];
    })

    .then(function(coordArray) {
        const latArray = coordArray[0];
        const longArray = coordArray[1];
        const nameArray = coordArray[2];
        const rateArray = coordArray[3];
        const iconImage = storeIcon.src;
        markPlaces(nameArray,rateArray,latArray,longArray, latArray,longArray, iconImage);
    });

};

function setRestaurantLocations() {
    // Grabbing the user input
    const locationInput = document.querySelector('#search-bar').value;

    // Grabbing the API library for restaurants and inputing the user input
    let restaurantInfo= `https://my-little-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants-in-${locationInput}&key=AIzaSyBdsm65ywFiu-1TK-v03CKyD03g3T4i0AA&type=other_pet_services`;
  
    //Setting and creating icon
    let restaurantIcon = document.createElement('img');
    restaurantIcon.src = "Images/dog-food-bowl.png";

    get(restaurantInfo)
    .then(function(response) {
        const results = response.results;
        let latArray = [];
        let longArray = [];
        let nameArray = [];
        let rateArray = [];
        results.forEach((result) => {
            
            const lat = Number(result.geometry.location.lat);
            const long = Number(result.geometry.location.lng);
            const name = String(result.name);
            const rate = String(result.rating);
            latArray.push(lat);
            longArray.push(long);
            nameArray.push(name);
            rateArray.push(rate);
        });
    return [latArray, longArray,nameArray,rateArray,];
    })

    .then(function(coordArray) {
        const latArray = coordArray[0];
        const longArray = coordArray[1];
        const nameArray = coordArray[2];
        const rateArray = coordArray[3];
        const iconImage = restaurantIcon.src;
        markPlaces(nameArray,rateArray,latArray,longArray, latArray,longArray, iconImage);
        });

};
//Making the map, setting it to the first coordinates in the location inputed Array
function markPlaces(name, rating, latitude, longitude, inDesLat, inDesLong, iconPix) {
    const options = {
        zoom: 11,
        center: {lat:parseFloat(inDesLat[0]),lng:parseFloat(inDesLong[0])},
    }
    let map = new google.maps.Map(document.getElementById('map'), options);
    //Places a marker on each location
    for (let i = 0; i <= latitude.length; i++) {
        let marker = new google.maps.Marker({
            position:{lat: parseFloat(latitude[i]), lng: parseFloat(longitude[i])},
            map: map,
            icon: {
                url: iconPix,
                optimized: false}
        });

        let headName = `<h2>${name[i]}</h2>`;
       let url = headName.link(`https://www.google.com/search?q=${name[i]}&aqs=chrome.0.0l4.25261j0j8&sourceid=chrome&ie=UTF-8/`);

       let infoWindow = new google.maps.InfoWindow({
           content: url+ `<h2>Rating: ${rating[i]}</h2>`+'<h4>*If the rating is 0, it may mean that there is no rating for this location</h4>'
       });

       marker.addListener('click', function(){
           infoWindow.open(map, marker);
       });
          
    }
}
