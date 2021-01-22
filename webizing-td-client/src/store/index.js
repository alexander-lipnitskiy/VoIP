import Vuex from 'vuex';
import Vue from 'vue';

import things from './things';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    things
  }
});
