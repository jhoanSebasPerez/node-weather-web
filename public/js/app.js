const form = document.getElementById("form");
const address = document.getElementById("address");
const messageOne = document.getElementById("message-one");
const messageTwo = document.getElementById("message-two");
const messageThree = document.getElementById("message-three");

messageTwo.textContent = "";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  messageOne.textContent = "Loading...";
  fetch(`/weather?address=${address.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = `Location: ${data.place}`;
        messageTwo.textContent = `Forecast ${data.forecast.temperature} °C`;
        messageThree.textContent = `Humidity ${data.forecast.humidity}`;
      }
    });
});
