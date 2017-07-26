import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Home from '@/components/home'
import Detail from '@/components/detail'

Vue.use(Router)
Vue.use(VueResource);

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    }, {
        path: '/detail',
        name: 'detail',
        component: Detail
    },{
    	path: '/gohome',
    	redirect: '/'
    }
    ]
})
