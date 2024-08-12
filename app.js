const express = require('express')
const { Op } = require('sequelize')
const path = require('path');

const db = require('./models')
const Weather = db.WeatherCache

const app = express()
const port = 3000

// 服務靜態文件
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/Weather', (req, res) => {
  return Weather.findAll()
    .then((weather) => res.send({ weather }))
    .catch((err) => res.status(422).json(err))
})

app.get('/weather/:city', async (req, res) => {
  const { city } = req.params;

  try {
    // 檢查緩存
    const cachedData = await db.WeatherCache.findOne({
      where: {
        city,
        timestamp: {
          [Op.gt]: new Date(Date.now() - 60 * 60 * 1000) // 1 小時內
        }
      }
    });

    if (cachedData) {
      return res.json(cachedData.data);
    }

    // 使用 fetch 從中央氣象署API獲取數據
    const url = new URL('https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-428071F5-3244-4829-9E2E-21C8B7FA62BA');
    url.searchParams.append('Authorization', process.env.CWA_API_KEY);
    url.searchParams.append('locationName', city);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const locationData = data.records.location[0];

    if (!locationData) {
      return res.status(404).json({ error: 'City not found' });
    }

    // 處理和格式化數據
    const formattedData = {
      city: locationData.locationName,
      weather: locationData.weatherElement.reduce((acc, element) => {
        acc[element.elementName] = element.time.map(timeData => ({
          startTime: timeData.startTime,
          endTime: timeData.endTime,
          value: timeData.parameter.parameterName,
          unit: timeData.parameter.parameterUnit
        }));
        return acc;
      }, {})
    };

    // 緩存數據
    await db.WeatherCache.upsert({
      city,
      data: formattedData,
      timestamp: new Date()
    });

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching weather data' });
  }
});

// 確保數據庫連接和模型同步
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});