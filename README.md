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

![alt text](https://github.com/alexander-lipnitskiy/VoIP/blob/main/interface.png)

