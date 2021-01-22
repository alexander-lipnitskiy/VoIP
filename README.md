# Integrating VoIP Systems with The Internet of Things

In this architecture, access to sensors is possible through the Thing Description server. This server
provides a description of the sensor, its properties, events, methods. And also Dashboard that showing
in real-time current state of the sensors. VoIP phone connected to asterisk system that was installed
on Raspberry Pi3. Whenever user will call to the phone number that was given, asterisk address this
call to Ari Client(JavaScript application). This is the core module of our system where is located logic
of how to process phone call. Ari client using IBM Watson for translating text to speech.

![alt text](https://github.com/alexander-lipnitskiy/VoIP/blob/main/arch.png)

# Requirements
node.js - 12+

yarn - 1.19.1+

asterisk

# Hardware
Raspberry Pi with sensors
![alt text](https://github.com/alexander-lipnitskiy/VoIP/blob/main/hardware.png)


# Installation

## Step 1
Install asterisk on your system
Go to a Asterisk-config folder and replace files with your asterisk (/etc/asterisk)
Run asterisk

To run watson, ari-client, td server and client part open every folder and install node.js modules

```bash
yarn install
yarn run start or node watson.js
```

![alt text](https://github.com/alexander-lipnitskiy/VoIP/blob/main/interface.png)

# Links

To read more about Web of Things https://github.com/webofthings/webofthings.js

To read more about TD https://www.w3.org/TR/wot-thing-description/

To read more about JSON-LD https://json-ld.org/

To read more about Vocabulary https://schema.org/
