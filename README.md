# aws-cognito

## AUTHENTICATION DEMO
## Authentication with AWS Cognito using Vue.js
### This is a boilerplate project for Vuejs applications using AWS cognito

### Features
1. Register with email and password
2. Confirmation code sent to email
3. Confirmation code verification
4. Sign In for verified users
5. Sign Out
6. Password change or reset
7. Default Attributes (name, email, phone, etc.)
8. Custom Attributes (other phone numbers, custom addresses, etc.)

### Live Demo:
http://auth-cognito-attributes.s3-website-ap-southeast-1.amazonaws.com/home

let me know if you have some questions


## Build Setup

add src/components/config.js file to contain the following:
export const poolData = {
  UserPoolId: '<your user pool id>',
  ClientId: '<your client id>'
}


``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
