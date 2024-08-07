const express = require('express')
const app = express()

const port = 3000

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/weathers', (req, res) => {
  res.send('get all weathers')
})

app.get('/weathers/:city', (req, res) => {
  res.send(`get weather: ${req.params.id}`)
})

app.listen(3000, () => {
  console.log('App is running on post 3000')
})