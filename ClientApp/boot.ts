import './css/site.css';
import 'bootstrap';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

Vue.use(VueRouter);
Vue.use(BootstrapVue);

const routes = [
    { path: '/', component: require('./components/home/home.vue.html') },
    { path: '/counter', component: require('./components/counter/counter.vue.html') },
    { path: '/fetchdata', component: require('./components/fetchdata/fetchdata.vue.html') },
    { path: '/sample', component: require('./components/sample/sample.vue.html') },
    { path: '/heroes', component: require('./components/heroes/heroes.vue.html') },
    { path: '/todos', component: require('./components/todos/todos.vue.html') },
    { path: '/coindesk', component: require('./components/coindesk/coindesk.vue.html') }
];
    
new Vue({
    el: '#app-root',
    router: new VueRouter({ mode: 'history', routes: routes }),
    render: h => h(require('./components/app/app.vue.html'))
});
