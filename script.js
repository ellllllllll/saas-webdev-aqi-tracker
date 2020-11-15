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
      let category = "";
      let meaning = "";
      let precautions = "";
      if (aqi < 51) {
        category = "Good";
        meaning = "Air quality is considered satisfactory, and air pollution poses little or no risk.";
        precautions = "<b>Everyone:</b> It is a great day to be active outside."
      } else if (aqi < 101) {
        category = "Moderate";
        meaning = "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
        precautions = `<b>Usually sensitive people:</b> Consider reducing prolonged or heavy exertion. Watch for symptoms such as coughing or shortness of breath. These are signs to take it easier. 
        <br><br><b>Everyone else:</b> It's a good day to be active outside.`;
      } else if (aqi < 151) {
        category = "Unhealthy for Sensitive Groups";
        meaning = "Members of sensitive groups may experience health effects. The general public is not likely to be affected.";
        precautions = `<b>Sensitive Groups:</b> Reduce prolonged or heavy exertion. It's OK to be active outside, but take more breaks and do less intense activities. Watch for symptoms such as coughing or shortness of breath.  
        <br><br><b>People with asthma:</b> Follow your asthma action plans and keep quick relief medicine handy.
        <br><br><b>If you have heart disease:</b> Symptoms such as palpitations, shortness of breath, or unusual fatigue may indicate a serious problem. If you have any of these, contact your health care provider.`;
      } else if (aqi < 201) {
        category = "Unhealthy";
        meaning = "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
        precautions = `<b>Sensitive Groups:</b> Avoid prolonged or heavy exertion. Move activities indoors or reschedule to a time when the air quality is better.  
        <br><br><b>Everyone else:</b>  Reduce prolonged or heavy exertion. Take more breaks during all outdoor activities.`;
      } else if (aqi < 301) {
        category = "Very Unhealthy";
        meaning = "Health alert: everyone may experience more serious health effects.";
        precautions = `<b>Sensitive Groups:</b> Avoid all physical activity outdoors. Move activities indoors or reschedule to a time when the air quality is better.  
        <br><br><b>Everyone else:</b> Avoid prolonged or heavy exertion. Consider moving activities indoors or rescheduling to a time when the air quality is better.`;
      } else {
        category = "Hazardous";
        meaning = "Health warnings of emergency conditions. The entire population is more likely to be affected.";
        precautions = `<b>Everyone:</b> Avoid all physical activity outdoors.
        <br><br><b>Sensitive Groups:</b> Remain indoors and keep activity levels low. Follow tips for keeping particle levels low indoors.`;
      }
      document.getElementById("aqi-category").innerHTML = "<b>" + category + "</b>";
      document.getElementById("aqi-meaning").innerHTML = meaning;
      document.getElementById("safety-precautions").innerHTML = precautions;
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
