
const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const compile = webpack(webpackConfig)

const router = express.Router()

router.get('/simple/get', (req, res) => {
  res.json({
    msg: `hello world`
  })
})

router.get('/base/get', (req, res) => {
  res.json(req.query)
})

app.use(router)

app.use(webpackDevMiddleware(compile, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunk: false
  }
}))

app.use(webpackHotMiddleware(compile))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8080

module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl + C to stop`)
})

