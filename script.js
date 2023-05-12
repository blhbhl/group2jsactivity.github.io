
console.log('Hello world!');

const body = document.getElementById('body');


const dispalyResult = (lon, lat, data) => {

  console.log(data);
  let element = document.createElement("h1");
  element.innerText = `Weather result in ${lon}, ${lat} is: ${data.temperature}`;
  body.append(element);
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;


  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${crd.latitude}&longitude=${crd.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)
    .then(result => result.json()).then(
      data => {
        dispalyResult(crd.latitude, crd.longitude, data.current_weather);
      }
    );


}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
