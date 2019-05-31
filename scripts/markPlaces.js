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