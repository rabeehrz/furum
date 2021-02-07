const app = require('./app');
const config = require('./config');

const PORT = config.port || 9999;

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${9999}`);
});

// const sslServer = https.createServer(
//   {
//     key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
//   },
//   app
// );

// sslServer.listen(PORT, () => {
//   console.log(`Listening on port http://localhost:${9999}`);
// });
