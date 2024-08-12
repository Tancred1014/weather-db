const express = require('express')
const app = express()

const port = 3000

const db = require('./models')
const Weather = db.WeatherCache


app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/Weather', (req, res) => {
  return Weather.findAll()
    .then((weather) => res.send({ weather }))
    .catch((err) => res.status(422).json(err))
})

app.get('/weathers/:city', (req, res) => {
  res.send(`get weather: ${req.params.id}`)

  // 使用 fetch 從中央氣象署API獲取數據
  const url = new URL('https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-170A256F-A2D0-401E-BE60-63929987B84E');
  url.searchParams.append('Authorization', process.env.CWA_API_KEY);
  url.searchParams.append('locationName', city);

  const response = fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = response.json();

  const locationData = data.records.location[0];

  if (!locationData) {
    return res.status(404).json({ error: 'City not found' });
  }
})

app.listen(3000, () => {
  console.log('App is running on post 3000')
})