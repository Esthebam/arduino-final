
const development = {
    url: 'http://localhost:4000'
  };
  
  const production = {
    url: 'https://agile-taiga-96267.herokuapp.com'
  };
  
  const config = process.env.NODE_ENV === 'development' ? development : production;
  config.url = url;
  
  module.exports = config;