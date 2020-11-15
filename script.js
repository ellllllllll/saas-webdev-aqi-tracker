const weather_bit = '19dd68f5f7df450c936afb3707058c90';

function getCurrentAQI() {
  let zipcode = document.getElementById('zipcode').value;
  const currentAQI_url = `https://api.weatherbit.io/v2.0/current/airquality?postal_code=${zipcode}&country=US&key=${weather_bit}`

 
  fetch(currentAQI_url) 
  .then(response => response.json())
  .then(function(data) {
      console.log(data);
      let aqi = data.data[0].aqi;
      document.getElementById("aqi-zipcode").innerHTML = aqi;
      getForecastAQI(zipcode);
      getPastAQI(zipcode);
  })
  .catch(function() {
      // This is where you run code if the server returns any errors
  });
}

function getPastAQI(zipcode) {
  const pastAQI_url = `https://api.weatherbit.io/v2.0/history/airquality?postal_code=${zipcode}&country=US&key=${weather_bit}`

  fetch(pastAQI_url) 
  .then(response => response.json())
  .then(function(data) {
      let aqiData = data.data;
      let hourlyPastAQI = {};
      
      let pastLabels = [];
      let pastData = []
      for (i = 0; i < aqiData.length; i++) {
        hourlyPastAQI[i] = {};
        hourlyPastAQI[i][aqiData[i]['timestamp_local']] = aqiData[i]['aqi'];
        pastLabels.push(aqiData[i]['timestamp_local']);
        pastData.push(aqiData[i]['aqi']);
      }
     
      createGraph(pastLabels, pastData, "pastAQIChart");
  })
  .catch(function() {
      // This is where you run code if the server returns any errors
  });
}

function getForecastAQI(zipcode) {
  const forecastAQI_url = `https://api.weatherbit.io/v2.0/forecast/airquality?postal_code=${zipcode}&country=US&key=${weather_bit}`

  fetch(forecastAQI_url) 
  .then(response => response.json())
  .then(function(data) {
      let aqiData = data.data;
      let hourlyForecastAQI = {};
      console.log(aqiData);

      let forecastLabels = [];
      let forecastData = [];
      for (i = 0; i < aqiData.length; i++) {
        hourlyForecastAQI[i] = {};
        hourlyForecastAQI[i][aqiData[i]['timestamp_local']] = aqiData[i]['aqi'];
        forecastLabels.push(aqiData[i]['timestamp_local']);
        forecastData.push(aqiData[i]['aqi']);
      }
      createGraph(forecastLabels, forecastData, "forecastAQIChart");

      console.log(hourlyForecastAQI); //stores each hour and its aqi (for future 72 hours) in dictionary
  })
  .catch(function() {
      // This is where you run code if the server returns any errors
  });
}

//for generating the chart
function createGraph(labels, data, id) {
  var ctx = document.getElementById(id).getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Timestamp',
              data: data,
              borderWidth: 1, 
              
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
}
