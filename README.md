# BusyBeeSpelling App

A simple learning game for children utilizing PhoneGap / Cordova and AngularJS

### Installation

First install PhoneGap

`$ sudo npm install -g phonegap`

Second Install Codrova CLI

`$ sudo npm install -g cordova`

Third Add Platforms to Project (untracked by git)

`$ cordova platform add ios && cordova platform add browser && cordova platform add android`

Lastly Build the Project

`$ cordova build`

### Running The App
This will open the app in a browser window, replace `browser` with your plaform of choice.

`$ cordova run browser`

To view which platforms are available:

`$ cordova platforms ls`

To remove a platform:

`$ cordova platform remove android`

**IMPORTANT NOTE:** You must be sure to have the SDK of the platform you wish to run installed on your machine. Having Xcode installed will enable cordova to launch the ap in the built in emulator, installing the Android SDK will be required to run and emulate the Android platform.
