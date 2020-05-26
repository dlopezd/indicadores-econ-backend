const config = require('config');
const express = require('express');
const http = require('http');
var cors = require('cors')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const routerAlbum = require('./routes/albumRoutes');

const server = express();

server.use(cors())
server.use(routerAlbum);

server.use((err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).send({ ok: false, error: err.message, data: null })
})

const serverHttp = http.createServer(server);
server.use(express.json());


serverHttp.listen(process.env.PORT, () => {
  const host = serverHttp.address().address;
  const port = serverHttp.address().port;
  console.log('Server run at http://%s:%s', host, port);
});

