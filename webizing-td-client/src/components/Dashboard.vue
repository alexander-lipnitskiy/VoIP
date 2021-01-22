<template>
    <div>
      <div style="font-size: 20px; margin-right: auto; padding-bottom:12px;">
        Raspberry Pi Sensors
      </div>
<el-row :gutter="12" style="padding-bottom: 5px;">
  <el-col :span="8">
    <el-card shadow="never" style="height: 177px;">
      <div slot="header" class="clearfix">
        <span>Led</span>
      </div>
      <div style="display: flex;justify-content: center;">
          <div v-if="led == true">
            <img width="64" height="64" src="../../icons/led-on.png">
          </div>
          <div v-else>
            <img width="64" height="64" src="../../icons/led-off.png">
          </div>

          <el-button :disabled="this.motionFlag == true || this.lightFlag == true" style="float: right; margin-left: 3px" size="mini" v-on:click="swicthLed()">{{this.led ? 'Turn off' : 'Turn on'}}</el-button>
      </div>
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card shadow="never" style="height: 177px;">
      <div slot="header" class="clearfix">
        <span>Motion PIR</span>
      </div>
      <div style="display: flex;justify-content: center;">
      <img width="64" height="64" src="../../icons/motion.png">

      <div class="center" v-on:click="swicthPir()">{{this.motion ? 'Detected' : 'Undetected'}}</div>
      </div>
      
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card shadow="never" style="height: 177px;">
      <div slot="header" class="clearfix">
        <span>Light</span>
      </div>
      <div style="display: flex;justify-content: center;">
      <div v-if="light == true">
            <img width="64" height="64" src="../../icons/moon.png" v-on:click="swicthLight()">
          </div>
          <div v-else>
            <img width="64" height="64" src="../../icons/sun.png" v-on:click="swicthLight()">
          </div>
      </div>
    </el-card>
  </el-col>
</el-row>

<el-row :gutter="24">
   <el-col :span="24">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>Gyroscope</span>
      </div>
      <div style="display: flex;justify-content: center; flex-direction: raw; align-items: center; width: 100%">
        <div><img width="64" height="64" src="../../icons/gyroscope.png" ></div>
        <div>X: {{this.gyro.gyro.x}}<br> Y: {{this.gyro.gyro.y}}<br> Z: {{this.gyro.gyro.z}}</div>
      </div>
      
    </el-card>
  </el-col>
</el-row>

<div style="font-size: 20px; margin-right: auto; padding-bottom:12px; padding-top:12px;">
        Raspberry Pi Actions
      </div>
      <span style="padding-right: 5px;">Automatically turn on/off the led when motion is detected</span> <el-button size="mini" v-on:click="swicthMotion()">{{this.motionFlag ? 'Turn off': 'Turn on'}}</el-button>
      <br>
      <span style="padding-right: 5px;">Automatically turn on/off the led when dark/sun</span> <el-button size="mini" v-on:click="swicthLight()">{{this.lightFlag ? 'Turn off': 'Turn on'}}</el-button>

    </div>
</template>

<script>
import io from "socket.io-client";
const socket = io.connect("http://192.168.0.158:4000");
 
    export default {
        name: "Dashboard",
        data() {
            return {
                led: false,
                motion: false,
                gyroscope: {

                },
                light: false,
                motionFlag: false,
                lightFlag: false,
                gyro: {}
            }
        },
        created() {
          this.getRealtimeData()
        },
        methods: {
          swicthLed() {
            fetch('http://192.168.0.158:4000/pi/led', {
              method: 'POST', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({onoff: !this.led}),
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
          },
          swicthMotion(){
        fetch('http://192.168.0.158:4000/pi/motion-act', {
              method: 'POST', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({onoff: !this.motionFlag}),
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
          },
          swicthLight() {
            fetch('http://192.168.0.158:4000/pi/light-act', {
              method: 'POST', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({onoff: !this.lightFlag}),
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
          },

          swicthPir() {

            this.motion = !this.motion
          },
           getRealtimeData() {
            socket.on("sensors", fetchedData => {
              this.led = fetchedData.led == 1 ? true: false;
              this.motion = fetchedData.motion == 1 ? true: false;
              this.light = fetchedData.light == 1 ? true: false;
              this.motionFlag =  fetchedData.motionFlag;
              this.lightFlag =  fetchedData.lightFlag;
              this.gyro = fetchedData.gyro;
            })
          },
        }
    }
</script>

<style scoped>
#divider {
  margin-bottom: 24px;
}
.center {
  height: 70px;
  line-height: 70px; /* same as height! */
}
</style>
