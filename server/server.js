const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = 8000;

// Configuración de middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware personalizado para CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Usar el router por defecto de json-server
server.use(router);

// Iniciar el servidor
server.listen(port, () => {
  console.log(`JSON Server running on http://localhost:${port}`);
});
