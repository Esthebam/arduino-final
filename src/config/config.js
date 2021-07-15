
const development = {
    url: 'http://localhost:4000'
  };
  
  const production = {
    url: 'https://serene-crag-90446.herokuapp.com' // Reemplazar
  };
  
  const config = process.env.NODE_ENV === 'development' ? development : production;

  module.exports = config;