const shell = require('shelljs');
const server = require('./http');
const moment = require('moment');



syncSchemaBackToNama = (schema, last_modified = moment().unix()) => {
  shell.exec('nama-sync-helper -d ' + Buffer.from(schema).toString('base64'), {silent:true}, function(code, stdout, stderr) {
    if(code == 0) {
      return
    }
  });
  shell.exec('nama-sync-helper -t '+ last_modified, {silent:true}, function(code, stdout, stderr) {
    if(code == 0) {
      return
    }
  });
}

module.exports ={ 
  removeNamespace: (namespace) => {
    server.post('/namespace/remove', {namespace: namespace})
    .then((res) => {
      syncSchemaBackToNama(res.data['schema'])
    })
    .catch((err) => {
      console.log(err)
    })
  },
  removeCommand: (namespace, commandName) => {
    server.post('/command/remove', 
      {namespace: namespace, 
        command_name: commandName,})
    .then((res) => {
      syncSchemaBackToNama(res.data['schema'])
    })
    .catch((err) => {
      console.log(err)
    })
  },
  schemaMerge: (schema) => {
    server.post('/schema/merge', 
      {schema: schema})
    .then((res) => {
      syncSchemaBackToNama(res.data['schema'], res.data['last_modified'])
    })
    .catch((err) => {
      console.log(err)
    })
  },
  namaSync: () => {
    shell.exec('nama-sync-helper -s', {silent:true}, function(code, stdout, stderr) {
      if(code == 0) {
        parseSchema = Buffer.from(stdout, 'base64').toString()
        module.exports.schemaMerge(parseSchema)
        console.log("Local Nama and cloud have been synced!")
      }
    });
  },
  checkForChanges: () => {
    shell.exec('nama-sync-helper -t', {silent:true}, function(code, stdout, stderr) {
      if(code == 0) {
        server.get('/get_changes', {last_modified: stdout})
        .then((res) => {
          if(res.data['status'] == 'no changes') {
            return console.log("No changes since the last synchronization")
          }
          else {
            console.log("Changes detected, syncing with the cloud")
            module.exports.namaSync();
            return console.log("Changes synced")
          }
        })
        .catch((err) => {
          console.log(err)
        })
      }
    });
  }
}
