const fs = require('fs');
const homeDir = require('os').homedir();

const configDir = homeDir +'/.config';
const mainDir = configDir +'/nama';
const nsConfigDir = mainDir + "/namaSync/"

const idFile = nsConfigDir + "asid"
const tokenFile = nsConfigDir + "tok"

module.exports = {
  getConfig: () => {
    if (fs.existsSync(idFile) && fs.existsSync(tokenFile)) {
      var id = fs.readFileSync(idFile, 'utf8');
      var token = fs.readFileSync(tokenFile, 'utf8');
      if(id && token) {
        return {
          id: id,
          token: token
        }
      }
    }
    return false
  },
  storeConfig: (id, token) => {
    try {
      if(!fs.existsSync(nsConfigDir)) {
        fs.mkdirSync(nsConfigDir, 0700);
      }
      module.exports.deleteConfig();

      fs.writeFileSync(idFile, id);
      fs.writeFileSync(tokenFile, token);
    }
    catch(e) {
      console.log("Error writing to config. Please check ~/.config directory permissions for current user");
    }
  },
  deleteConfig: () => {
    if(fs.existsSync(idFile)) {
      fs.unlinkSync(idFile);
    }
    if(fs.existsSync(tokenFile)) {
      fs.unlinkSync(tokenFile);
    }
  }
}
