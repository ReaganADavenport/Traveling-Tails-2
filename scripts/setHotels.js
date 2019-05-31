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