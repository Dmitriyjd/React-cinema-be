module.exports = {
  APP_PORT: 3000, // port which server will use for hosting data
  host: 'localhost', // variables which used to get connection to MongoDB
  port: 27017,
  db: 'dataBase',
  tokenMaxAge: 24 * 60 * 60, // lifetime of JWT (hours, minutes, seconds)
  allowedOrigins: ['http://localhost:8080', 'http://localhost:8081'], // origins which are able to make requests to server
  JWT_SECRET: 'JWT_SECRET', // secret key for creation JWT
  BF_SECRET: 'BF_SECRET', // secret key for encrypting blowFish-password
};
