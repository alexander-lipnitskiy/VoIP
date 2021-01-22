<template>
  <el-row :gutter="24">
    <el-col :lg="lg" :sm="sm" :md="md">
      <el-container>
        <el-header style="height: 60px">
          <div class="header">
            <span style="font-size:24px; color: #67C23A;">Webizing Web Thing Model</span>
          </div>
          
        <div class="divider"></div>

        </el-header>
        <el-container>
          <el-aside style="width: auto; padding-top: 1px;">
              <el-menu
                    default-active="/led/model"
                    class="el-menu-vertical-demo"
                    :collapse="isCollapse"
                    @select="handleSelect"
              >

              <el-menu-item index="/rapberry-pi/dashboard">
                <router-link tag="span" v-bind:to="`/rapberry-pi/dashboard`">Dashboard</router-link>
              </el-menu-item>

              <el-menu-item index="/raspberry-pi/model">
                <router-link tag="span" v-bind:to="`/raspberry-pi/model`">Raspberry Pi</router-link>
              </el-menu-item>

              <el-menu-item index="/led/model">
                <router-link tag="span" v-bind:to="`/led/model`">Led</router-link>
              </el-menu-item>

              <el-menu-item index="/motion/model">
                <router-link tag="span" v-bind:to="`/motion/model`">Motion</router-link>
              </el-menu-item>

              <el-menu-item index="/light/model">
                <router-link tag="span" v-bind:to="`/light/model`">Light sensor</router-link>
              </el-menu-item>

              <el-menu-item index="/gyroscope/model">
                <router-link tag="span"  v-bind:to="`/gyroscope/model`">Gyroscope</router-link>
              </el-menu-item>
              </el-menu>
          </el-aside>
          <el-main style=" padding-left: 3em; padding-top: 4em;">
            <transition name="fade" mode="out-in">
                <router-view/>
            </transition>
          </el-main>
        </el-container>
      </el-container>
    </el-col>
  </el-row>


</template>
<script>


  export default {
    name: 'App',
    components: {

    },
    created() {
      this.$store.dispatch('fetchMockupThings');
    },
    data() {
      return {
        lg: {span: 20, offset: 2},
        md: {span: 22, offset: 1},
        sm: {span: 22, offset: 1},
        isCollapse: false
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$router.push({ path: `${key}` })
      }
    }
  }
</script>

<style>
    body {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    .header {
      display: flex;
      height: 100%;
      align-items: center;
      padding-left: 5px;
    }

    .divider {
      display: block;
      height: 1px;
      width: 100%;
      margin: 0;
      background-color: #DCDFE6;
      position: relative;
    }

    .development {
        color: #F56C6C;
    }

</style>




