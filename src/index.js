const express = require('express')
const cors = require('cors')
const chalk = require('chalk')
const email = require('sendmail')()
const config = require('./config')
const utils = require('./utils')

const log = console.log

module.exports = class Server {
  constructor(port) {
    this.port = port
    this.init()
  }

  init() {
    this.app = express()
    this.app.use(cors())
    this.app.use(express.json())
    this.app.get('/', this.handleGet.bind(this))
    this.app.post('/', this.handleIncoming.bind(this))
    this.app.listen(this.port, () => {
      log(
        chalk`{blueBright Server listening on port {magenta ${this.port}}}`
      )
    })
  }

  handleGet(req, res) {
    res.json({
      status: 'ok'
    })
  }

  async handleIncoming(req, res) {
    const { body } = req
    try {
      await this.sendEmail(body)
      log(
        chalk`{blueBright Successfully sent email from {magenta ${body.email}}}`
      )
      res.json({
        message: 'ok'
      })
    } catch (error) {
      log(
        chalk`{magenta ${error.message}}`
      )
      res.status(500).json({
        error: error.message
      })
    }
  }

  async sendEmail(options) {
    return utils.asyncCallback(email, {
      from: `${options.name} <${options.email}>`,
      to: config.receiver,
      subject: options.subject,
      html: options.message
    })
  }
}
