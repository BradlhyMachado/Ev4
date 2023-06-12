// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// para peticiones
Vue.use(VueResource);

// para navegacion
import VueRouter from 'vue-router'
Vue.use(VueRouter);

//////////////////////////////////////////////////////////////////////
// para tener un router


import GrupoUsuarioComponent from './components/GrupoUsuarioComponent.vue';
import ProfesorComponent from './components/ProfesorComponent.vue';
import SeccionComponent from './components/SeccionComponent.vue';
import HorarioComponent from './components/HorarioComponent.vue';
import ParticipacionComponent from './components/ParticipacionComponent.vue';

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { // primero muestra el componente User
      path: '/grupoUsuario',
      component: GrupoUsuarioComponent
    },
    { // componente Test
      path: '/profesor',
      component: ProfesorComponent
    },
    { // primero muestra el componente User
      path: '/seccion',
      component: SeccionComponent
    },
    { // primero muestra el componente User
      path: '/horario',
      component: HorarioComponent
    },
    { // primero muestra el componente User
      path: '/participacion',
      component: ParticipacionComponent
    }
  ]
});
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueResource);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
}).$mount('#app')
