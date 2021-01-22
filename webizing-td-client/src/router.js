import Vue from 'vue'
import Router from 'vue-router'

import ThingDetails from './components/ThingModel';
import ThingPropertyID from './components/ThingPropertiesID';
import ThingProperties from './components/ThingProperties';
import HomeForElderlyMap from './components/HomeForElderlyMap';
import IPCameraDashboard from './components/IPCameraDashboard';
import OrbitdbDash from './components/OrbitdbDash';
import Dashboard from './components/Dashboard';

Vue.use(Router);

export default new Router({
  base: '/td',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/airQuality/model'
    },
    {
      path: '/rapberry-pi/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/orbitdb-dashboard',
      name: 'orbitdb-dash',
      component: OrbitdbDash
    },
    {
      path: '/dashboard',
      name: 'thing-properties-dashboard',
      component: HomeForElderlyMap
    },
    {
      path: '/ipCamera/dashboard',
      name: 'ipCamera-dashboard',
      component: IPCameraDashboard
    },
    {
      path: '/:thing/model',
      name: 'thing-model',
      component: ThingDetails
    },
    {
      path: '/:thing/properties',
      name: 'thing-properties',
      component: ThingProperties
    },
    {
      path: '/:thing/properties/:name',
      name: 'thing-properties-id',
      component: ThingPropertyID
    }
  ]
})
