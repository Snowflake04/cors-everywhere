const server = require('./modules/server');
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`${server.name} listening at ${server.url}`);
});
