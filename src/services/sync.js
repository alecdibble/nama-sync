const shell = require('shelljs');
const server = require('./http');
const moment = require('moment');



syncSchemaBackToNama = (schema) => {
  shell.exec('nama-sync-helper -d ' + schema, {silent:true}, function(code, stdout, stderr) {
    console.log('Exit code:', code);
    if(code == 0) {

    }
    console.log('Program output:', stdout);
    console.log('Program stderr:', stderr);
  });
}


module.exports ={ 
  addNamespace: (namespace, description = null) => {
    server.post('/namespace/add', {namespace: namespace, descirption: description})
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  removeNamespace: (namespace) => {
    server.post('/namespace/remove', {namespace: namespace})
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  addCommand: (namespace, commandName, command, updatedAt = moment().unix(), description=null ) => {
    server.post('/command/add', 
      {namespace: namespace, 
        command_name: commandName, 
        command: command, updated_at: 
        updatedAt, 
        description: description})
    .then((res) => {
      console.log(res.data)
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
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  initialSync: () => {

    //Check and see if nama data has been modified since last sync
    //  -If so, grab it and send to server

    //Check server to see if there are any updates
    //Store updates locally

    shell.exec('nama-sync-helper -s', {silent:true}, function(code, stdout, stderr) {
      console.log('Exit code:', code);
      if(code == 0) {
        console.log('Program output:', stdout);
      }
    });
  }
}
