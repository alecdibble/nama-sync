const axios = require('axios');
const queryString = require('querystring');

const apiBase = "http://52197dbc.ngrok.io/api/v1";

const config = require('./storage').getConfig();

module.exports = {
  post: (url, data) => {
    if(config) {
      data['id'] = config['id']
      data['token'] = config['token']
    }
    return axios.post(apiBase + url, data)
  },
  get: (url, query) => {
    if(config) {
      query['id'] = config['id'];
      query['token'] = config['token']
    }
    return axios.get(apiBase + url + '?' + queryString.stringify(query))
  }
}
