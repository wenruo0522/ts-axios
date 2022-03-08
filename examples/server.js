
const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const compile = webpack(webpackConfig)

const router = express.Router()

registerSimpleRouter()

registerBaseRouter()

registerErrorRouter()

registerExtendRouter()


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
app.use(router)

const port = process.env.PORT || 8080

module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl + C to stop`)
})

function registerSimpleRouter() {
  router.get('/simple/get', (req, res) => {
    res.json({
      msg: `hello world`
    })
  })
}

function registerBaseRouter() {
  router.get('/base/get', (req, res) => {
    res.json(req.query)
  })

  router.post('/base/post', (req, res) => {
    res.json(req.body)
  })

  router.post('/base/buffer', (req, res) => {
    let msg = []
    req.on('data', chunk => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}

function registerErrorRouter() {
  router.get('/error/get', (req, res) => {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', (req, res) => {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}

function registerExtendRouter() {
  router.get('/extend/get', (req, res) => {
    res.json({
      msg: 'hello world'
    })
  })

  router.options('/extend/options', (req, res) => {
    res.end()
  })

  router.delete('/extend/delete', (req, res) => {
    res.end()
  })

  router.head('/extend/head', (req, res) => {
    res.end()
  })

  router.post('/extend/post', (req, res) => {
    res.json(req.body)
  })

  router.put('/extend/put', (req, res) => {
    res.json(req.body)
  })

  router.patch('/extend/patch', (req, res) => {
    res.json(req.body)
  })

  router.get('/extend/user', (req, res) => {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'jack',
        age: 18
      }
    })
  })


}

