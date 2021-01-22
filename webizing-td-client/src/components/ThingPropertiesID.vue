<template>
    <div v-if="!loading">
      <span style="font-size: 20px">
          {{ property.title }}
        </span>
      <p>Type of:
        [ <el-link
                v-bind:href="thingDescriptionPropertyURL()"
                type="primary"
        >{{property.title}}</el-link> ]
      </p>

      <h3>Property details</h3>
      <p>{{ property.description }}</p>

      <p><b>Type:</b> {{ property.type }}</p>
      <p v-if="property.type==='array'">
        <b>Items:</b> {{ property.items }}
      </p>
      <p><b>Read only:</b> {{ property.readOnly }}</p>
      <p><b>Observable:</b> {{ property.observable }}</p>
      <p><b>Write only:</b> {{ property.writeOnly }}</p>

      <h3 v-if="uriVariables.length !== 0">Uri Variables</h3>

      <el-table :data="uriVariables" v-if="uriVariables.length !== 0" border style="width: 100%">
        <el-table-column prop="name" label="Name of variable" width="520"></el-table-column>
        <el-table-column prop="typeOf" label="Type of">
          <template slot-scope="scope">
            <el-link
                    v-bind:href="ontologyLink(scope.row.typeOf)"
                    type="primary"
            >{{scope.row.typeOf}}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="type"> </el-table-column>
      </el-table>

      <h3>Forms</h3>

      <el-table :data="property.forms" border style="width: 100%">
        <el-table-column prop="href" label="URL" width="520"></el-table-column>
        <el-table-column prop="contentType" label="Content Type"></el-table-column>
        <el-table-column prop="op" label="Operation"> </el-table-column>
        <el-table-column prop="secure" label="Access"> </el-table-column>
      </el-table>
    </div>
</template>

<script>

import { mapState } from "vuex";

export default {
  name: "ThingPropertyDetails",
  data() {
    return {
      context: "https://schema.iot.webizing.org/"
    };
  },
  computed: {
    property () {
      if(!this.loading)
        return this.$store.getters.getPropertyDetailsOfSensor(this.$route.params.thing, this.$route.params.name)
    },
    uriVariables () {
      const property = this.$store.getters.getPropertyDetailsOfSensor(this.$route.params.thing, this.$route.params.name);
      if (property.hasOwnProperty('uriVariables')) {
        let output = [];
        const obj = property.uriVariables;

        for (const key of Object.keys(obj)) {
          output.push({
            name: key,
            typeOf: obj[key]['@type'],
            type: obj[key].type
          });
        }

        return output;
      }
      return []
    },
    ...mapState({
      loading: state => state.things.loading,
      error: state => state.things.error
    })
  },
  methods: {
    thingDescriptionPropertyURL: function() {
      return `${this.context}${this.property["@type"]}`;
    },
    ontologyLink: function(param) {
      return `${this.context}${param}`;
    }
  }
};
</script>

<style scoped></style>
