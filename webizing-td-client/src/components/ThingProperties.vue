<template>
    <div v-if="!loading">
        <h3>Properties</h3>
        <div v-bind:key="item['_id']" v-for="item in values" style="padding-bottom: 20px;">
            <el-table :data="item" border style="width: 100%; margin-bottom: 20px;">
                <el-table-column prop="property" label="Property"></el-table-column>
                <el-table-column prop="value" width="720" label="Value"></el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: "ThingProperties",
        data() {
            return {
                model: null,
                error: null,
                loading: true,
                values: {}
            };
        },
        created() {
            this.model = this.getSensorByName(this.$route.params.thing);
            this.fetchModelData()
        },
        computed: {
            ...mapGetters(["getSensorByName"])
        },
        methods: {
            async fetchModelData() {
                this.loading = true;

                const response = await fetch(`http://localhost:4000/graphql`, {
                        method: "POST",
                        headers: { Accept: "application/json",  "Content-Type":"application/json"},
                        body: JSON.stringify({ query: `{${this.$route.params.thing} {_id ${Object.keys(this.model.properties).join(' ')}}}`})
                    }
                );

                if (!response.ok) {
                    this.error = response.statusText;
                } else {
                    const res = await response.json();
                    const values = await res.data[this.$route.params.thing];

                    this.values = this.convertToArrayWithValues(values)
                }
                this.loading = false;
            },
            convertToArrayWithValues(values) {
                let output = [];
                if(!Array.isArray(values)) {
                    values = [values]
                }

                for (let item of values) {
                    let sensorsValues = [];
                    for (const key of Object.keys(item)) {
                        sensorsValues.push({
                            property: key,
                            value: item[key]
                        })

                    }
                    output.push(sensorsValues);
                }

                return output;
            },
        }
    }
</script>

<style scoped>

</style>
