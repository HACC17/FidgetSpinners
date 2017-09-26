# Hawaii Revised Statutes App

## Installation and Starting
To install ionic, use the commands:

`$ sudo npm install -g cordova`

`$ sudo npm install -g ionic`

`$ npm install`

Then cd to the client directory

To start the app, simply type
$ `ionic serve`
But please note that the camera function is disable for this option as well as ios styling. (This is intended to be an Android application). ios styling issues may arise using ionic serve.


### Emulating on Android Studio 
To emulate on an Android Emulator/Device to use all the features:

1. Download Android Studio https://developer.android.com/studio/index.html
2. in the client directory, use the commands:

2a. `$ ionic cordova platform add android`

2b. `$ ionic cordova build android `

2c. `$ ionic cordova emulate android` or `ionic cordova run android` if you have an android device plugged in


3.  If you receive an error in step 2c, follow this step: 
3a. Open Android Studio.
3b. Click 'Open an existing Android Studio project'
3c. Navigate to 'hrs-app/client/platforms/android' and open it
3d  Create an AVD, if you dont have one already using AVD Manager in Android Studio
3e. The Run button (green triangle) should be activated, click it
3f. Set the operating system to Android 7.0 Nougat, and choose a device that can run the OS (e.g. Google Pixel)
3g. Close Android Studio and repeat step 2c.


### Building the Android Project into an APK file:

1. Customize the config.xml based on desired build settings, it can be found in /platforms/android/res
2. In the client directory, use the command:
    $ ionic cordova build --release android  
3. Find the unsigned APK file in platforms/androids/build/outputs/apk and run an alignment utility on it
3a. If you have a signing key, you are finished. If not, continue on:
4. Generate a private key for it using the keytool command that comes with the JDK:
    $ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
4a. If the tool can't be found, refer to 'http://ionicframework.com/docs/v1/guide/installation.html'
5. Create a password for the keystore, answer its questions, and you will get a file called 'my-release-key.keystore' 
   in your current directory
6. Run the jarsinger tool to sign the unsigned APK:
    $ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name
7. Run the zipalign tool found in '~/Library/Android/sdk/build-tools/VERSION/zipalign' and run:
    $ zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk
8. You will now have your final release binary called "HelloWorld.apk", HelloWorld replaced by whichever name you chose 
    in your previous steps.


To upload your APK in the Google Play Store:

1. Visit the 'https://play.google.com/apps/publish/signup/' and create a new Developer Account, paying the respective 
  fees
2. Click 'Publish an Android App on Google Play'
3. Edit the product details to your liking.
    
