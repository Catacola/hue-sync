# hue-sync
Sync hue lights in multiple locations from a single controller

# Overview

## Client
- Has tutorial to pair with bridge (for now, assume 1 bridge on a network)
- Can find bridge on network without user inputting IP
- Listens on a pub/sub system (e.g. MQTT via AWS) or keeps an open connection with a server (e.g. websox)
- Pushes new light commands (e.g. level, hue, saturation) to all lights on paired bridge
- Can pause and resume control without disconnecting the app
- Open Q: Should patterns be run locally or treated just like any other command and we just spam them down?

## Controller
- Can push commands to a pub/sub (e.g. MQTT) or a server which will multiplex out to open connections
- Can select color
  - Either from palette or from a colorwheel
- Can run basic patterns like a rainbow fade, a hue wave, cycle through a palette, etc.

# Dev Stuff

## Hue Docs/APIs

- Intro: https://developers.meethue.com/develop/get-started-2/
- How to discover bridge: https://developers.meethue.com/develop/application-design-guidance/hue-bridge-discovery/
- Python wrapper for most of these commands: https://github.com/studioimaginaire/phue

## Emulator
Download a Hue emulator here: https://steveyo.github.io/Hue-Emulator/

Fire it up with
```
java -jar HueEmulator-v0.8.jar
```

Throw a sudo infront of that if you want to develop on port 80.

## Basic Development
Find the IP address of the bridge. If you're using the emulator, it's `localhost:8000`.

To get a username, press the link button on your bridge/emulator then run the following within 30 seconds:
```
export HUEUSER=`curl http://localhost:8000/api -d '{"devicetype":"my_hue_app#hue sync"}' -X POST | jq -r '.[0].success.username'`
```
You can also use `newdeveloper` as a username for quick development with the emulator, but we will need to be able to generate one for the final project.

To check which lights are linked and their status:
```
curl http://localhost:8000/api/$HUEUSER/lights
```

To change the state of light 1 (yes, they're 1-indexed and not 0-indexed):
```
curl http://localhost:8000/api/$HUEUSER/lights/1/state -d '{"on":true, "hue":33333}' -X PUT
```
