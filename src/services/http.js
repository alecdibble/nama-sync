const axios = require('axios');
const queryString = require('querystring');
const storage = require('./storage')

const apiBase = "https://aliasync.com/api/v1";




module.exports = {
  post: (url, data) => {
    var config = storage.getConfig()
    if(config) {
      data['id'] = config['id']
      data['token'] = config['token']
    }
    return axios.post(apiBase + url, data)
  },
  get: (url, query) => {
    var config = storage.getConfig()
    if(config) {
      query['id'] = config['id'];
      query['token'] = config['token']
    }
    return axios.get(apiBase + url + '?' + queryString.stringify(query))
  }
}
