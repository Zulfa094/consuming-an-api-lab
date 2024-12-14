require('dotenv').config()
const express = require('express')
const axios = require('axios')
const path = require('path')

const app = express()
const API = process.env.API_KEY
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.post('/weather', (req, res) => {
  axios({
    method: 'get',
    url: `http://api.openweathermap.org/data/2.5/weather?q=${req.body['zip']}&appid=a4a8c4a3fa96f5de03ac15ac22375ad9`
  })
    .then((response) => {
      console.log(response)
      res.render('weather/show.ejs', { data: response.data })
    })
    .catch((err) => {
      console.log(err)
    })
})

app.listen(port, () => {
  console.log(`App is Running on port ${port}`)
})
