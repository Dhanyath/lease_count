# lease_count
This app is used to store the least count player score.

#Install the dependencies listed in package.json 
npm install --force

#Create your eas account and follow the below steps
eas login (provide your username and password to login)
eas build:configure

#To run in local emulator
npm start

#To create a build for android in expo.dev
eas build --profile development --platform android (This will require expo.go app to run the application)
npm start

#To generate a standalone apk
eas build --profile preview --platform android
