const express = require('express')
const app = express()

const port = 3000

const db = require('./models')
const Weather = db.WeatherCache

console.log(Weather)

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
})

app.listen(3000, () => {
  console.log('App is running on post 3000')
})