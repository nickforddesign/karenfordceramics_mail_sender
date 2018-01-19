const http = require('http')
const cors = require('cors')
const chalk = require('chalk')

module.exports = class Server {
  constructor(port) {
    this.port = port
    this.init()
  }

  init() {
    this.http = http.createServer(this.handleIncoming).listen(this.port)
  }

  handleIncoming(req, res) {
    console.log(req)
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(req.url + 'taco')
    res.end()
  }
}