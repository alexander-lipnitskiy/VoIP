<template>
        <div id="full_div">
            <l-map
                :fitBounds:="bounds"
                :crs:="crs"
                :zoom="1"
                :center="center"
                style="width: 100%; height: 100%; "
                @update:zoom="zoomUpdated"
            >
                <l-image-overlay
                        :url="url"
                        :bounds="bounds">
                </l-image-overlay>
                <l-marker
                        v-for="c in cameras"
                        :lat-lng="c"
                        :key="c.name">
                    <l-icon
                            :iconSize="iconSize"
                            :iconAnchor="staticAnchor"
                            :iconUrl="c.angle == 360? camera360: camera" >
<!--                        <div>d</div>-->
                    </l-icon>
                </l-marker>

                <l-circle-marker
                        v-for="c in mapUserToMap"
                        :lat-lng="c"
                        :key="c.name"
                        :radius="circle.radius"
                        :color="c.markColor"
                >
                    <l-popup><span style="font-size: 14px">User Info</span><br><b>name</b>: {{c.name}} </l-popup>
                </l-circle-marker>

            </l-map>
    </div>

</template>

<script>
    import { CRS } from "leaflet";
    import { LMap, LImageOverlay, LMarker, LCircleMarker, LPopup, LIcon } from "vue2-leaflet";
    import image from "../assets/image.png"
    import camera360 from "../assets/cam360.png";
    import camera from "../assets/Security-Camera-icon.png";

    import { elderlyMap, userIcon } from "./mockForIPCamera";

    export default {
        name: "HomeForElderlyMap",
        components: {
            LMarker,
            LMap,
            LImageOverlay,
            LCircleMarker,
            LPopup,
            LIcon
        },
        props: {
            locations: Array //[{name: '', room: '', location: ''}]
        },
        data() {
            return {
                url: image,
                crs: CRS.Simple,
                bounds: [[-400, -300], [200, 400]],
                zoom: 1,
                center: [-3.006127, 50.045471],
                currentZoom: 5,
                staticAnchor: [16, 16],
                iconSize: [32, 32],
                camera: camera,
                camera360: camera360,
                circle: {
                    center: [47.413220, -1.0482],
                    radius: 6,
                    color: 'red'
                },
                cameras: [
                    { name: 'camera1', angle: '180', lng: 128.147278, lat: -72.571782 },
                    { name: 'camera2', angle: '360', lng: 205.464249, lat: -50.743408 },
                    { name: 'camera3', angle: '180', lng: 203.941956, lat: -72.425586 },
                    { name: 'camera4', angle: '360', lng: 205.331726, lat: -79.216906},
                    { name: 'camera5', angle: '360', lng: 267.794495, lat: -51.392779 },
                    { name: 'camera6', angle: '360', lng: 269.358673, lat: -79.327847 },
                    { name: 'camera7', angle: '360', lng: 329.727173, lat: -51.88624 },
                    { name: 'camera8', angle: '360', lng: 343.866577, lat: -78.971386 },
                    { name: 'camera9', angle: '180', lng: 373.342896, lat: -73.263122 }
                    // { name: 'foboo01', lng: 182.190399, lat: -54.440499 },
                    // { name: 'foboo02', lng: 310.624008, lat: -81.045246 }
                ],
                users: [{
                    name: "user1",
                    room: "room3"
                }, {
                    name: "user2",
                    room: "room3"
                },{
                    name: "user3",
                    room: "room3"
                },{
                    name: "user4",
                    room: "room3"
                },{
                    name: "user5",
                    room: "room3"
                }]
            };
        },
        created() {
            setInterval(this.updateMap, 5000);
        },
        methods: {
            zoomUpdated (zoom) {
                this.currentZoom = zoom;
            },
            centerUpdated (center) {
                this.center = center;
            },
            onMapClick(e) {
                alert("You clicked the map at " + e.latlng);
            },
            getAvailableLocation(room, el) {
                let roomIndex = el[room].findIndex(item => item.isAvailable === true);
                el[room][roomIndex].isAvailable = false;
                return el[room][roomIndex].locations;
            },
            updateMap() {
                const arr = ["room1","room2","room3","room4","room5","hall1","sunroom"];
                const tmp = [];
                for (let i =0; i< this.users.length; i++) {
                    tmp.push({name: this.users[i].name, room: arr[Math.floor(Math.random() * 7)]});
                }
                this.users = tmp;
            },
            jsonCopy(src) {
                return JSON.parse(JSON.stringify(src));
            }
            // boundsUpdated (bounds) {
            //     this.bounds = bounds;
            // }
        },
        computed: {
            mapUserToMap() {
                const el = this.jsonCopy(elderlyMap);

                return this.users.map(item => {
                    const loc = this.getAvailableLocation(item.room, el);
                    return {
                        name: item.name,
                        lat: loc["lat"],
                        lng: loc["lng"],
                        markColor: userIcon[item.name]
                    }
                });
            }
        }
    };
</script>
<style scoped>
    #full_div {
        display: flex;
        width: 100%;
        height: 500px;
    }
</style>
