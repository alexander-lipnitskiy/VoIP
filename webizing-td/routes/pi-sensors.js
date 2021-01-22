const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

const i2c = require('i2c-bus');
const MPU6050 = require('i2c-mpu6050');

const MPU_6050_ADDR = 0x68;

var LED = new Gpio(22, 'out'); //use GPIO pin 4, and specify that it is output
var MOTION = new Gpio(23,'in','rising');
var LIGHT = new Gpio(12,'output');

var MOTION_FLAG = true;
var LIGHT_FLAG = false;

router.get('/motion', async (req, res) => {
    res.send({
        status: MOTION .readSync()
    })
});


router.get('/led', async (req, res) => {

    res.send({
        status: LED.readSync()
    })
}); 

//{'onoff':true}
router.post('/led', async (req, res) => {
    LED.writeSync(req.body.onoff ? 1: 0); //set pin state to 1 (turn LED on)

    const io = req.app.get('socketio');
    io.emit('led', LED.readSync())

    res.send({
        status: LED.readSync()
    })
});


//{'onoff':true}
router.post('/motion-act', async (req, res) => {
    MOTION_FLAG = req.body.onoff ? true: false;
    
    const io = req.app.get('socketio');
    io.emit('motion-flag', MOTION_FLAG)

    res.send({
        status: MOTION_FLAG
    })
});

//{'onoff':true}
router.post('/light-act', async (req, res) => {
    LIGHT_FLAG = req.body.onoff ? true: false;
    
    const io = req.app.get('socketio');
    io.emit('light-flag', LIGHT_FLAG)

    res.send({
        status: LIGHT_FLAG
    })
});

router.get('/light', async (req, res) => {
    res.send({
        status: LIGHT.readSync()
    })
});

router.get('/gyroscope', async (req, res) => {
    const i2c1 = i2c.openSync(1);
    const sensor = new MPU6050(i2c1, MPU_6050_ADDR);
    const data = sensor.readSync();
    i2c1.closeSync();

    res.send({
        status: data
    })
});

function monitoringLightState() {
	if (LIGHT_FLAG == true) {
		if(LIGHT.readSync() == 1) {
			LED.writeSync(1);
		} else {
			LED.writeSync(0);
		}
		
	} 	
}

function monitoringMotionState() {
	if (MOTION_FLAG == true) {
		if(MOTION.readSync() == 1) {
			LED.writeSync(1);
		} else {
			LED.writeSync(0);
		}
		
	} 	
}

function monitoringSensorsState() {
	const i2c1 = i2c.openSync(1);
    	const sensor = new MPU6050(i2c1, MPU_6050_ADDR);
    	const gyro = sensor.readSync();
    	i2c1.closeSync();
	global.io.emit('sensors', {
	   led: LED.readSync(),
	   light: LIGHT.readSync(),
           motion: MOTION.readSync(),
           motionFlag: MOTION_FLAG,
	   lightFlag: LIGHT_FLAG,
	   gyro: gyro
	})
}

setInterval(monitoringLightState, 200);
setInterval(monitoringMotionState, 200);
setInterval(monitoringSensorsState, 200);

module.exports = router;
