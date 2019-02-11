#!/usr/bin/env node

const commandExists = require('command-exists');
const shell = require('shelljs');
const minimist = require('minimist');

const storage = require('./services/storage');
const install = require('./install');
const sync = require('./services/sync')


function namaSyncInit() {
  if(shell.which('nama-sync-helper')) {
    config = storage.getConfig()
    if(config) {
      sync.initialSync();
    }else {
      //Account signup/login
      install();
    }
  }
  else {
    console.log("Please install Nama before installing NamaSync")
    console.log("Visit https://github.com/alecdibble/nama to learn more")
  }
}

const args = minimist(process.argv.slice(2))

console.log(args._)

if(args._[0] == 'logout') {
  storage.deleteConfig();
  console.log("You have been logged out.")
  return
}

//namespace add/remove [namespace] [description]
if(args._[0] == 'namespace') {
  console.log(1)
  if(args._[1] && args._[2]) {
    if(args._[1] == 'add') {
      return sync.addNamespace(args._[2], args._[3])
    }
    if(args._[1] == 'remove') {
      return sync.removeNamespace(args._[2])
    }
  }
  throw new Error('Error with namespace formatting: '+args._[0]+' '+args._[1]+' '+args._[2]);
}

//command add/remove [commandName] [command] [updatedAt] [description]
if(args._[0] == 'command') {
  if(args._[1] && args._[2] && args._[3] && args._[4]) {
    if(args._[1] == 'add') {
      return sync.addCommand(args._[2], args._[3], args._[4], args._[5], args._[6])
    }
    if(args._[1] == 'remove') {
      return sync.removeCommand(args._[2], args._[3])
    }
  }
  throw exception('Error with command formatting: '+args._[0]+' '+args._[1]+' '+args._[2]);
}

namaSyncInit();
