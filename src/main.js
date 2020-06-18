import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VeeValidate from 'vee-validate';
import {Validator} from 'vee-validate';
import pt_BR from 'vee-validate/dist/locale/pt_BR';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)
library.add(fas);
library.add(fab);
Vue.use(VeeValidate)
Validator.localize('pt_BR', pt_BR);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
