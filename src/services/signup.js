const server = require('./http');
const storage = require('./storage');

module.exports = (signupData) => {
  server.post('/signup', signupData)
  .then((res) => {
    console.log(res.data)
    storage.storeConfig(res.data['id'], res.data['token'])
  })
  .catch((err) => {
    console.log(err)
  })
}
