require('./bootstrap');
require('./CustomFilters');

import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import { Form, HasError, AlertError } from 'vform'


//Form validation section
window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
//creating a global vue instance to get $emit functionality 
window.Fire = new Vue();

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);
Vue.component('pulse-loader', require('vue-spinner/src/PulseLoader.vue'));

Vue.use(VueRouter);

let app = new Vue({
    el: '#app',
    router: new VueRouter(routes),
    
});
