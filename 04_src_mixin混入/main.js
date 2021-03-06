//该文件是整个项目的文件入口

import Vue from 'vue'         //引入Vue
import App from './App.vue'   //引入App组件，它是所有组件的父组件
//引入混合
import {hunhe,hunhe2} from './mixin'

Vue.config.productionTip = false

Vue.mixin(hunhe)
Vue.mixin(hunhe2)

new Vue({
    el:'#app',
    render: h => h(App),  //render函数完成了这个功能，将App组件放入到容器中
}) //.$mount('#app')