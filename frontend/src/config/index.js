const env = process.env.NODE_ENV;

const development = {
  apiurl: "http://localhost:3001"
};

const test = {
  apiurl: "http://localhost:3001"
};

const production = {
  apiurl: "http://ip-api.caioalonso.com"
};

const config = { development, test, production };

module.exports = config[env];
