const server = require('./http');
const storage = require('./storage');

module.exports = (loginData) => {
  server.post('/login', loginData)
  .then((res) => {
    console.log(res.data)
    storage.storeConfig(res.data['id'], res.data['token'])
  })
  .catch((err) => {
    console.log(err)
  })
}
