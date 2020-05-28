const config = require('config');
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
var cors = require('cors')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const indicadoresRouter = require('./routes/indicadoresRoutes');
const otherRoutes = require('./routes/otherRoutes')

const server = express();


const swaggerDocument = require('./swagger.json');
server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use(cors())
server.use(indicadoresRouter);
server.use(otherRoutes);
server.use((err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).send({ ok: false, error: err.message, data: null })
})

const serverHttp = http.createServer(server);
server.use(express.json());

const port = process.env.PORT ? process.env.PORT :
             process.env.PORT_BACK ? process.env.PORT_BACK : 2000;
serverHttp.listen(port, () => {
  const host = serverHttp.address().address;
  const port = serverHttp.address().port;
  console.log('Server run at http://%s:%s', host, port);
});

