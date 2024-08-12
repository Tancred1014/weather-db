document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById('cityInput');
  const searchBtn = document.getElementById('searchBtn');
  const weatherInfo = document.getElementById('weatherInfo');

  searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeather(city);
    }
  });

  cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const city = cityInput.value.trim();
      if (city) {
        fetchWeather(city);
      }
    }
  });

  async function fetchWeather(city) {
    try {
      const response = await fetch(`/weather/${encodeURIComponent(city)}`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      displayWeather(data);
    } catch (error) {
      weatherInfo.innerHTML = `<p>錯誤：${error.message}</p>`;
    }
  }

  function displayWeather(data) {
    const elements = data.weather;
    let html = `<h2>${data.city} 天氣資訊</h2>`;

    for (const [key, value] of Object.entries(elements)) {
      html += `<div class="weather-item">
                        <h3>${getElementName(key)}</h3>
                        ${value.map(item => `
                            <div class="weather-detail">
                                <p>時間：${formatDate(item.startTime)} - ${formatDate(item.endTime)}</p>
                                <p>數值：${item.value}${item.unit ? ` ${item.unit}` : ''}</p>
                            </div>
                        `).join('')}
                    </div>`;
    }

    weatherInfo.innerHTML = html;
  }

  function getElementName(key) {
    const names = {
      Wx: '天氣現象',
      PoP: '降雨機率',
      MinT: '最低溫度',
      CI: '舒適度',
      MaxT: '最高溫度'
    };
    return names[key] || key;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:00`;
  }
});