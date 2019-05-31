async function dogQuote() {
    try{
        const dogInfo = 'https://my-little-cors-proxy.herokuapp.com/https://dog-api.kinduff.com/api/facts?number=1';
        const dogText = document.querySelector('.dog-blurb-style');
        const response = await get(dogInfo);
        dogText.innerHTML = response.facts;
    } catch(error){
        console.log(error.message);
    }
}