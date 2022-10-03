# Deprecated/Not Maintained

# nama-sync
Sync utility for nama - store your aliases in the cloud

## About

nama-sync is a utility created by AliaSync to keep your version of nama across all of your computers & sessions. Additionally, AliaSync will soon open up a team feature that will utilize the cloud synchronization.

## Installation

You must install [nama](https://www.github.com/alecdibble/nama) before installing nama-sync.

### Installing using NPM

```
npm install -g nama-sync
nama-sync
```

If you run into permissions errors, please run this command:

```
npm install -g nama-sync --unsafe-perm=true
```

If that still gives permissions issues, please follow [this guide](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) to fixing npm permissions issues. You should not need `sudo` to install this.

### Installing on Ubuntu

```
sudo apt-get install build-essential
npm install -g nama-sync
nama-sync
```

If you run into permissions issues, please follow [this guide](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) to fixing npm permissions issues. You should not need `sudo` to install this.

## Registering for an account

Once nama-sync is installed, please run `name-sync` or `aliasync`. You will be prompted to login or register for an account. AliaSync is free and the base functionality will always stay free. Additionally, your data will always stay private. Your email or data will never be mined or sold to third parties. Your password is encrypted with Bcrypt and the latest best security best practices are utilized. Penetration testing is planned for the future.

## Why are nama & nama-sync seperate packages?

Security and flexibility are very important to Nama. In order for it to be a generally useful utility, I wanted it to be deployable in all types of situations. Nama doesn't contain any networking functionality, so it can be deployed in secure or offline locations without degradation in peformance or related security concerns.


