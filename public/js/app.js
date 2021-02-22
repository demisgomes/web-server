console.log('Client side javascript file');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    //avoids refresh browser
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    const location = search.value;
    console.log(location);
    fetch('http://localhost:3000/weather?address=' + location)
        .then((response) =>
            response.json().then(
                (data) => {
                    console.log(data);
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast.weather_description+ '. Current temperature is '+data.forecast.temperature+' degrees and feels like '+data.forecast.feelslike;
                }
            )
        );
})