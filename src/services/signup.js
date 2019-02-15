const server = require('./http')
const storage = require('./storage')
const sync = require('./sync')

module.exports = (signupData) => {
  server.post('/signup', signupData)
  .then((res) => {
    storage.storeConfig(res.data['id'], res.data['token'])
    sync.namaSync()
  })
  .catch((err) => {
    console.log(err)
  })
}
