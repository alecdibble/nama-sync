const inquirer = require('inquirer');
const signup = require('./services/signup');
const login = require('./services/session');

var signupState = {}
var loginState = {}

const emailValidator = value => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return ;
  if (re.test(String(value).toLowerCase())) {
    return true;
  }
  return 'Must be a valid email address';
};

const passwordValidator = value => {
  if (value.length > 7) {
    return true;
  }
  return 'Password needs to be at least 8 characters long';
};

const passwordConfirmValidator = (value, answers) => {
  if(signupState['password'] === value) {
    return true;
  }
  return 'Passwords must match';
};

function accountPrompt() {
  inquirer.prompt({
    type: 'confirm',
    message: 'Do you already have an account with AliaSync?',
    name: 'account',
    default: false,
    validate: passwordValidator
  }).then(answers => {
    if(answers.account) {
      accountEmailPrompt()
    }
    else {
      console.log(" ")
      console.log("No account? That's ok! Let's quickly create a free account to enable cloud sync functionality!");
      console.log(" ")
      emailPrompt();
    }
  });
}

function accountEmailPrompt() {
  inquirer.prompt({
    type: 'input',
    message: 'Enter your registered email address:',
    name: 'accountEmail',
    validate: passwordValidator
  }).then(answers => {
    loginState['email'] = answers.accountEmail;
    accountPasswordPrompt();
  });
}

function accountPasswordPrompt() {
  inquirer.prompt({
    type: 'password',
    message: 'Enter your password:',
    name: 'accountPassword',
    mask: '*',
    validate: passwordValidator
  }).then(answers => {
    loginState['password'] = answers.accountPassword;
    login(loginState)
  });
}

function emailPrompt() {
  inquirer.prompt({
    type: 'input',
    message: 'Enter your email address:',
    name: 'email',
    validate: passwordValidator
  }).then(answers => {
    signupState['email'] = answers.email;
    firstPasswordPrompt();
  });
}

function firstPasswordPrompt() {
  inquirer.prompt({
    type: 'password',
    message: 'Enter an account password:',
    name: 'password1',
    mask: '*',
    validate: passwordValidator
  }).then(answers => {
    signupState['password'] = answers.password1;
    secondPasswordPrompt();
  });
}

function secondPasswordPrompt() {
  inquirer.prompt({
    type: 'password',
    message: 'Confirm your password:',
    name: 'password1',
    mask: '*',
    validate: passwordConfirmValidator
  }).then(answers => {
    signup(signupState)
  });
}


module.exports = accountPrompt;
