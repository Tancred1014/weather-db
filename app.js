const express = require('express')
const app = express()

const port = 3000

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000, () => {
  console.log('App is running on post 3000')
})