const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const { env } = process;

module.exports = {
  env: 'development',
  port: env.PORT || 9999,
  mongoose: {
    url: `mongodb://${env.MONGODB_USER}:${env.MONGODB_PASSWORD}@localhost:${env.MONGODB_PORT}/${env.MONGODB_DB}`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: env.JWT_SECRET,
    accessExpires: 7,
  },
};
