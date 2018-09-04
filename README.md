# poolpal-react-native

React native version of my PoolPal app

Uber-like ride-sharing application created with `react-native` and `react-native-map`.

![Uber-like animation](https://github.com/davidwu220/poolpal-react-native/uber-animation-small.gif)

Had to make some adjustments to the underlying components for the application to work properly.

## Installation

Clone this repo and run

```
npm install
```

**You will need to follow the official [installation guide](https://github.com/react-community/react-native-maps/blob/master/docs/installation.md) to configure the application.**

## To run this application in development mode

Run

```
react-native run-ios
```

if you are running this application for the first time.

In future builds, you can just run

```
react-native start
```

to start the server for live reloading.

Alternitavely, you can run it either on a simulator or on your local device through Xcode. Just make sure to use the `/ios/*.xcworkspace` project file instead of the `.xcodeproj` one.

## To build your app for production,

Follow facebook's [official guide](https://facebook.github.io/react-native/docs/running-on-device).

---

**Note that I only make sure it supports iOS devices, for now. It may or may not work on Android devices.**
