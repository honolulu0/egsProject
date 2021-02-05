import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as api from './api/index.js' // 导入api接口
import router from './router'

import UmyUi from 'umy-ui'
import 'umy-ui/lib/theme-chalk/index.css'; // 引入样式

Vue.prototype.$api = api; // 将api挂载到vue的原型上复制代码

Vue.use(ElementUI);
Vue.use(UmyUi);
Vue.config.productionTip = false



/******************路由卫士******************/
router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	next()
})
router.afterEach((to, from) => {

})
/******************路由卫士******************/

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
