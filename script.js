const weather_bit = '19dd68f5f7df450c936afb3707058c90';

function getCurrentAQI() {
  let zipcode = document.getElementById('zipcode').value;
  const currentAQI_url = `https://api.weatherbit.io/v2.0/current/airquality?postal_code=${zipcode}&country=US&key=${weather_bit}`

 
  fetch(currentAQI_url) 
  .then(response => response.json())
  .then(function(data) {
      console.log(data);
      let aqi = data.data[0].aqi;
      document.getElementById("aqi-current").innerHTML = aqi;
      let category = "";
      let meaning = "";
      let precautions = "";
      let color = "";
      if (aqi < 51) {
        category = "Good";
        meaning = "Air quality is considered satisfactory, and air pollution poses little or no risk.";
        precautions = "<b>Everyone:</b> It is a great day to be active outside."
        color = "#43d11f"; //green
      } else if (aqi < 101) {
        category = "Moderate";
        meaning = "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
        precautions = `<b>Usually sensitive people:</b> Consider reducing prolonged or heavy exertion. Watch for symptoms such as coughing or shortness of breath. These are signs to take it easier. 
        <br><br><b>Everyone else:</b> It's a good day to be active outside.`;
        color= "#faf482"; //yellow
      } else if (aqi < 151) {
        category = "Unhealthy for Sensitive Groups";
        meaning = "Members of sensitive groups may experience health effects. The general public is not likely to be affected.";
        precautions = `<b>Sensitive Groups:</b> Reduce prolonged or heavy exertion. It's OK to be active outside, but take more breaks and do less intense activities. Watch for symptoms such as coughing or shortness of breath.  
        <br><br><b>People with asthma:</b> Follow your asthma action plans and keep quick relief medicine handy.
        <br><br><b>If you have heart disease:</b> Symptoms such as palpitations, shortness of breath, or unusual fatigue may indicate a serious problem. If you have any of these, contact your health care provider.`;
        color = "#fa8a34"; //orange 
      } else if (aqi < 201) {
        category = "Unhealthy";
        meaning = "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
        precautions = `<b>Sensitive Groups:</b> Avoid prolonged or heavy exertion. Move activities indoors or reschedule to a time when the air quality is better.  
        <br><br><b>Everyone else:</b>  Reduce prolonged or heavy exertion. Take more breaks during all outdoor activities.`;
        color = "#d12c2c"; //red
      } else if (aqi < 301) {
        category = "Very Unhealthy";
        meaning = "Health alert: everyone may experience more serious health effects.";
        precautions = `<b>Sensitive Groups:</b> Avoid all physical activity outdoors. Move activities indoors or reschedule to a time when the air quality is better.  
        <br><br><b>Everyone else:</b> Avoid prolonged or heavy exertion. Consider moving activities indoors or rescheduling to a time when the air quality is better.`;
        color = "#7a4d94"; //purple
      } else {
        category = "Hazardous";
        meaning = "Health warnings of emergency conditions. The entire population is more likely to be affected.";
        precautions = `<b>Everyone:</b> Avoid all physical activity outdoors.
        <br><br><b>Sensitive Groups:</b> Remain indoors and keep activity levels low. Follow tips for keeping particle levels low indoors.`;
        color = "#6e0000"; // dark red
      }
      document.getElementById("aqi-category").innerHTML = "<b>" + category + "</b>";
      document.getElementById("aqi-meaning").innerHTML = meaning;
      document.getElementById("safety-precautions").innerHTML = precautions;
      let elements = document.getElementsByClassName('firstrow1');
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor=color;
        if (color == "#6e0000" || color == "#d12c2c" || color =="#7a4d94"){
          elements[i].style.color = "white";
        }
      }
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
      for (i = aqiData.length - 1; i >= 0; i -= 1) {
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


//TO-DO: style graphs to have the same y-axis scaling
//for generating the chart
function createGraph(labels, data, id) {
  var ctx = document.getElementById(id).getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'AQI',
              data: data,
              borderWidth: 2, 
              fill:  false
              
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
