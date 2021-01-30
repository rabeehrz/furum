const app = require('./app');
const config = require('./config');

const PORT = config.port || 9999;

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${9999}`);
});
