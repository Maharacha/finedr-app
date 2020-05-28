# finedr-app
Ionic app for Finedr parking app.

## Build contianer
Inside docker directory, run:  
`docker build -t finedr-app .`

## Run container
`docker run -ti --rm -p 8100:8100 --privileged -v /path/to/finedr-app-dir-on-host/:/finedr-app  finedr-app bash`

## Install plugins in project folder
In `/finder-app` inside the container, run:  
`npm install`

## Run in browser
In `/finder-app` inside the container, run:  
`ionic cordova run browser -l`  
Now it should be accessible on `http://localhost:8100`

## Install on android device
In `/finder-app` inside the container, run:  
`ionic cordova run android`  
Or just build the app:  
`ionic cordova build android`

## IOS
`sudo gem install cocoapods`  
Inside `platform/ios` directory:  
`pod install`  
`pod update`

## IOS privacy settings in Xcode
```
/platform/ios/Finedr/Finedr-Info.plist
Info
Key: Privacy - Camera Usage Description
Value: "Whatever the camera is used for."
```
