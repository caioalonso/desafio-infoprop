const env = process.env.NODE_ENV;

const development = {
  dburl: process.env.MONGO_URI || 'mongodb://localhost/desafio_dev'
};

const test = {
  dburl: process.env.MONGO_URI || 'mongodb://localhost/desafio_test'
};

const production = {
  dburl: process.env.MONGO_URI || 'mongodb://localhost/desafio'
};

const config = { development, test, production };

module.exports = config[env];
