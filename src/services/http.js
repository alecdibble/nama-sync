const axios = require('axios');

const apiBase = "http://localhost:6689/api/v1";

const config = require('./storage').getConfig();

module.exports = {
  post: (url, data) => {
    if(config) {
      data['id'] = config['id'];
      data['token'] = config['token']
    }
    return axios.post(apiBase + url, data)
  }
}
