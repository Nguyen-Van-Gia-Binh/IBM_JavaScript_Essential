// Tự động load API Key từ localStorage khi mở trang
document.addEventListener("DOMContentLoaded", () => {
  const savedKey = localStorage.getItem("weatherApiKey");
  if (savedKey) {
    document.getElementById("apiKey").value = savedKey;
  }
});

function showweatherDetails(event) {
  event.preventDefault();

  const city = document.getElementById("city").value;
  const apiKey = document.getElementById("apiKey").value.trim(); // Lấy key từ giao diện
  const weatherInfo = document.getElementById("weatherInfo");

  // Kiểm tra nếu người dùng chưa nhập Key hoặc City
  if (!apiKey) {
    weatherInfo.innerHTML = `<p style="color: #ffcccc;">Please enter your API Key first!</p>`;
    return;
  }
  if (!city) {
    weatherInfo.innerHTML = `<p style="color: #ffcccc;">Please enter a city name.</p>`;
    return;
  }

  // Lưu API Key vào localStorage để lần sau không cần nhập lại
  localStorage.setItem("weatherApiKey", apiKey);

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid API Key or City not found");
      }
      return response.json();
    })
    .then((data) => {
      const weatherInfo = document.getElementById("weatherInfo");
      weatherInfo.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <div class="info-box">
        <p>Temperature</p>
        <span class="temp-val">${data.main.temp} °C</span>
    </div>
    <div class="info-box">
        <p>Condition</p>
        <span style="text-transform: capitalize; color: #38bdf8;">${data.weather[0].description}</span>
    </div>
`;
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      weatherInfo.innerHTML = `<p>Error: ${error.message}. Please check your key/city and try again.</p>`;
    });
}

document
  .getElementById("weatherForm")
  .addEventListener("submit", showweatherDetails);
