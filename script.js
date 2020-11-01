API_KEY='19dd68f5f7df450c936afb3707058c90';
function getAQI() {
  let zipcode = document.getElementById('zipcode').value;
  const url = `https://api.weatherbit.io/v2.0/current/airquality?postal_code=${zipcode}&country=US&key=${API_KEY}`

  fetch(url) // Call the fetch function passing the url of the API as a parameter
  .then(response => response.json())
  .then(function(data) {
      // Your code for handling the data you get from the API
      console.log(data);
      let aqi = data.data[0].aqi;
      document.getElementById("aqi").innerHTML = aqi;
  })
  .catch(function() {
      // This is where you run code if the server returns any errors
  });
}


// const axios = require("axios");

// function getAQI() {
//   const zipcode = document.getElementById("zipcode").value;
//   console.log(zipcode);

//   axios
//     .get(
//       `https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=${zipcode}&distance=25&API_KEY=6ED9A890-CF68-4009-8F5D-67968F9CF527`
//     )
//     .then(function (response) {
//       // handle success
//       const dateObserved = response.data.dateObserved;
//       const hourObserved = response.data.hourObserved;
//       const localTimeZone = response.data.localTimeZone;
//       const reportingArea = response.data.reportingArea;
//       const stateCode = response.data.stateCode;
//       const latitude = response.data.latitude;
//       const longitude = response.data.longitude;
//       const parameterName = response.data.parameterName;
//       const aqi = response.data.aqi;
//       const categoryNumber = response.data.categoryNumber;
//       const categoryName = response.data.categoryName;

//       document.getElementById("aqi").innerHTML = `${aqi}`;
//       alert(aqi);
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     })
//     .then(function () {
//       // always executed
//     });
// }


// const dateObserved = response.data.dateObserved;
//       const hourObserved = response.data.hourObserved;
//       const localTimeZone = response.data.localTimeZone;
//       const reportingArea = response.data.reportingArea;
//       const stateCode = response.data.stateCode;
//       const latitude = response.data.latitude;
//       const longitude = response.data.longitude;
//       const parameterName = response.data.parameterName;
//       const aqi = response.data.aqi;
//       const categoryNumber = response.data.categoryNumber;
//       const categoryName = response.data.categoryName;