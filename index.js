const config = require('./src/config')
const Server = require('./src')

const port = config.port

/* eslint-disable no-new */
new Server(port)
