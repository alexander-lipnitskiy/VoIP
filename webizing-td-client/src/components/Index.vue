<template>
  <div>
    <h1>
      Webizing
      <el-link
        style="font-size: 24px"
        type="default"
        href="https://www.w3.org/Submission/wot-model"
        >Web Thing Model</el-link
      >
    </h1>
    Version 1.0.0
    <h3>Things</h3>
    <div
      v-bind:key="key"
      v-for="(value, key) in things"
      style="padding-bottom: 20px"
    >
      <router-link class="el-link el-link--primary is-underline" v-bind:to="`${key}/model`" style="font-size: 16px">{{ value.name }}</router-link>
      <br />
      <span style="font-size: 14px">{{ value.description }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Index",

  computed: {
    ...mapState({
      things: state => state.things.td
    })
  }
};
</script>

<style scoped>

</style>
