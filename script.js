const weather_bit = '19dd68f5f7df450c936afb3707058c90';
function getAQI() {
  let zipcode = document.getElementById('zipcode').value;
  const currentAQI_url = `https://api.weatherbit.io/v2.0/current/airquality?postal_code=${zipcode}&country=US&key=${weather_bit}`

  fetch(currentAQI_url) 
  .then(response => response.json())
  .then(function(data) {
      console.log(data);
      let aqi = data.data[0].aqi;
      document.getElementById("aqi-zipcode").innerHTML = aqi;
  })
  .catch(function() {
      // This is where you run code if the server returns any errors
  });

  const pastAQI_url = `https://api.weatherbit.io/v2.0/history/airquality?postal_code=${zipcode}&country=US&key=${weather_bit}`

  fetch(pastAQI_url) 
  .then(response => response.json())
  .then(function(data) {
      let aqiData = data.data;
      let hourlyPastAQI = {};
      console.log(aqiData);
      for (i = 0; i < aqiData.length; i++) {
        hourlyPastAQI[i] = {};
        hourlyPastAQI[i][aqiData[i]['timestamp_local']] = aqiData[i]['aqi'];
      }
      console.log(hourlyPastAQI); //stores each hour and its aqi (for past 72 hours) in dictionary
      var list = document.getElementById('pastAQI');
      aqiData.forEach(function (hour) {
        var li = document.createElement('li');
        li.textContent = hour['timestamp_local'] + "   -->   " + hour['aqi'];
        list.appendChild(li);
      });
  })
  .catch(function() {
      // This is where you run code if the server returns any errors
  });


  const forecastAQI_url = `https://api.weatherbit.io/v2.0/forecast/airquality?postal_code=${zipcode}&country=US&key=${weather_bit}`

  fetch(forecastAQI_url) 
  .then(response => response.json())
  .then(function(data) {
      let aqiData = data.data;
      let hourlyForecastAQI = {};
      console.log(aqiData);
      for (i = 0; i < aqiData.length; i++) {
        hourlyForecastAQI[i] = {};
        hourlyForecastAQI[i][aqiData[i]['timestamp_local']] = aqiData[i]['aqi'];
      }
      console.log(hourlyForecastAQI); //stores each hour and its aqi (for future 72 hours) in dictionary
      var list = document.getElementById('forecastAQI');
      aqiData.forEach(function (hour) {
        var li = document.createElement('li');
        var category = "";
        var aqi = hour['aqi']
        if (aqi < 51) {
          category = "Good";
        } else if (aqi < 101) {
          category = "Moderate";
        } else if (aqi < 151) {
          category = "Unhealthy for Sensitive Groups";
        } else if (aqi < 201) {
          category = "Unhealthy";
        } else if (aqi < 301) {
          category = "Very Unhealthy"
        } else {
          category = "Hazardous"
        }
        li.textContent = hour['timestamp_local'] + "   -->   " + hour['aqi'] + "   -->   " + category;
        list.appendChild(li);
      });
  })
  .catch(function() {
      // This is where you run code if the server returns any errors
  });
}


// const aqicn_key = '43133f0e16346b8f7282da964d163204aa5c71ff';

// function callAqiCN() {
//   let city = document.getElementById('city').value;
//   const aqicn_url = `http://api.waqi.info/feed/${city}/?token=${aqicn_key}`;

//   fetch(aqicn_url) // Call the fetch function passing the url of the API as a parameter
//   .then(response => response.json())
//   .then(function(data) {
//       // Your code for handling the data you get from the API
//       console.log(data);
//       let aqi = data.data.aqi;
//       document.getElementById("aqi-city").innerHTML = aqi;
//   })
//   .catch(function() {
//       // This is where you run code if the server returns any errors
//   });
// }