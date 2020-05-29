# hue-sync
Sync hue lights in multiple locations from a single controller

# Overview

## Client
- ✅ Has tutorial to pair with bridge (for now, assume 1 bridge on a network)
- ✅ Can find bridge on network without user inputting IP
- ✅ Listens to a websox multiplexer living on AWS for light commands
- ✅ Pushes new light commands (e.g. level, hue, saturation) to all lights on paired bridge
- ✅ Can pause and resume control without disconnecting the app
- User can control overall/maximum brighness of lights
- ✅ App can push along hue, sat, bri, on/off commands
- Open Q: Should patterns be run locally or treated just like any other command and we just spam them down?
  - Answer: run locally

## Controller
- ✅ Can push commands to a websox multiplexer
- ✅ Can select color
  - Either from palette or from a colorwheel
- Can run basic patterns like a rainbow fade, a hue wave, cycle through a palette, etc.
  - ✅ Can build a generic step/fade pattern with up to 6 colors

# Dev Stuff

## Client
- Ditched the python client. Going full browser.
- `cd client/`
- `yarn install`
- `yarn start`
- Open `http://localhost:3000` if yarn doesn't do it for you

## Controller
- `cd admin/`
- `yarn install`
- `yarn start`
- Open `http://localhost:3001` if yarn doesn't do it for you

## Manual Controller
- Send commands manually to the websocket-based "chatroom" running on AWS
- Install wscat via `npm install -g wscat`
- Connect: `wscat -c wss://mmyh4hlyp8.execute-api.us-east-1.amazonaws.com/Prod`
- Send messages like: `{"message":"sendmessage", "data":"{\"hue\":33333}"}`
- Useful for testing new client capabilities before controller development

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

## Basic API Development
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
