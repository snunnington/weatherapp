window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;

      const api = `${proxy}https://api.darksky.net/forecast/6ee9c53462f04cb8e459ae1a927a910a/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {

          const {
            temperature,
            summary,
            icon
          } = data.currently;
          //Set DOM Elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //set icon
          setIcons(icon, document.querySelector(".icon"));

          //chan Celcius and farenheit
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === "F") {
              (temperatureSpan.textContent = "C");
            } else {
              temperatureSpan.textContent = "F";
            }



          });
        });
    });
  }

  //icon
  function setIcons(icon, iconID) {
    const skycons = new skycons({
      color: "white"
    });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

});