
const development = {
    url: 'http://localhost:4000'
  };
  
  const production = {
    url: 'https://agile-taiga-96267.herokuapp.com' // Reemplazar
  };
  
  const config = process.env.NODE_ENV === 'development' ? development : production;

  module.exports = config;