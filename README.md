# Remote Control Client


## Clone Source Code

Run `git clone https://github.com/BullTronics/Remote-Control-Client.git`

## Download Dependencies

Navigate to source code directory and Run `npm i`

## Run Remote-Control-Client (Emulator)

Run `npx react-native run-android` <br /><br />
*Make sure you have Android development environment setup already done for react native*<br />
*Refer `https://reactnative.dev/docs/environment-setup`*

## Build Android APK

Run `cd android; ./gradlew assembleDebug`

## Build Android Bundle

Run `cd android; ./gradlew bundleDebug`

## Configure & Connect to Server

Download Server <br />
*Make sure that server and client are on same network (Either same Wifi Network or same VPN Network)*<br /><br />
**Generic Server:** `https://github.com/BullTronics/Remote-Control-Server.git`

## Further help

To access Remote-Control-Server from remote client, Use ZeroTier to create Virtual Network `https://zerotier.com/` <br /><br />
To get more help on the Remote-Control-Client, contact `admin@bulltronics.com`.
