<template>
    <div>
        <h2>IP Camera Dashboard</h2>
        <h3>Video Monitoring</h3>
        <el-select v-model="valueCamera" placeholder="Select" style="padding-bottom: 1em; width: 240px;">
            <el-option
                    v-for="item in optionsCamera"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <div>
            <video width="100%" controls>
                <source src="mov_bbb.mp4" type="video/mp4">
                <source src="mov_bbb.ogg" type="video/ogg">
                Your browser does not support HTML5 video.
            </video>
        </div>
        <h3>Building Details</h3>
        <el-select v-model="value" placeholder="Select" style="padding-bottom: 1em; width: 240px;">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <HomeForElderlyMap></HomeForElderlyMap>

        <h3>Location</h3>
        <Map v-if="!loading" v-bind:locations="locations"></Map>
    </div>
</template>

<script>
    import Map from "./Map";
    import HomeForElderlyMap from "./HomeForElderlyMap";

    export default {
        name: "IPCameraDashboard",
        components: {
            Map,
            HomeForElderlyMap
        },
        created() {
            // this.fetchLocationData();
        },
        data() {
            return {

                locations: [
                    {name: "ipCamera01", address: "home for elderly", room: "1", location: "-"},
                    {name: "ipCamera02", address: "home for elderly", room: "2", location: "-"},
                    {name: "ipCamera03", address: "home for elderly", room: "3", location: "-"},
                    {name: "ipCamera04", address: "home for elderly", room: "4", location: "-"},
                    {name: "ipCamera05", address: "home for elderly", room: "5", location: "-"},
                    {name: "ipCamera06", address: "home for elderly", room: "6", location: "-"},
                    {name: "ipCamera07", address: "home for elderly", room: "7", location: "-"},
                    {name: "ipCamera08", address: "home for elderly", room: "8", location: "-"},
                    {name: "ipCamera09", address: "home for elderly", room: "9", location: "-"}
                ],
                loading: false,
                options: [{
                    value: 'Option1',
                    label: 'Home For Elderly People'
                }, {
                    value: 'Option2',
                    label: 'LivingLab'
                }],
                value: 'Option1',
                optionsCamera: [{
                    value: 'Option1',
                    label: 'Camera1'
                }, {
                    value: 'Option2',
                    label: 'Camera2'
                },{
                    value: 'Option3',
                    label: 'Camera3'
                }, {
                    value: 'Option4',
                    label: 'Camera4'
                },{
                    value: 'Option5',
                    label: 'Camera5'
                }, {
                    value: 'Option6',
                    label: 'Camera6'
                },{
                    value: 'Option7',
                    label: 'Camera7'
                }, {
                    value: 'Option8',
                    label: 'Camera8'
                },{
                    value: 'Option9',
                    label: 'Camera9'
                }],
                valueCamera: 'Option1'
            };
        },
        methods: {
            async fetchLocationData() {
                this.loading = true;

                const response = await fetch(`http://localhost:4000/graphql`, {
                        method: "POST",
                        headers: { Accept: "application/json",  "Content-Type":"application/json"},
                        body: JSON.stringify({ query: `{ ipCamera { name address room location }}`})
                    }
                );

                if (!response.ok) {
                    // this.error = response.statusText;
                } else {
                    const res = await response.json();
                    if(res.hasOwnProperty('errors')) {
                        this.locations = []
                    } else {
                        const locations = await res.data['ipCamera'];

                        if(Array.isArray(locations)) {
                            this.locations = locations
                        } else {
                            this.locations = [locations]
                        }

                        this.loading = false;
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
