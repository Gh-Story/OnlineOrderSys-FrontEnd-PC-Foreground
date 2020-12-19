import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Activity from '../views/Home/Activity/Activity.vue'
import RedPacketManage from '../views/Home/RedPacketManage/RedPacketManage.vue'
import TaskManage from '../views/Home/TaskManage/TaskManage.vue'
import MyCenter from '../views/Home/MyCenter/MyCenter.vue'
import Evaluation from '../views/Home/Evaluation/Evaluation.vue'
import CustomerSerivce from '../views/Home/CustomerService/CustomerService.vue'
import About from '../views/Home/About/About.vue'
import Welcome from '../views/Home/Welcome/Welcome.vue'
import Food from '../views/Home/Food/Food.vue'
import Order from '../views/Home/Order/Order.vue'
import store from '../store/index.js'
import Login from '../views/Home/Login/Login.vue'
import Register from '../views/Home/Register/Register.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
	children:[
		{
		  path: '/Home/Activity',
		  name: 'Activity',
		  component:Activity
		},
		{
		  path: '/Home/RedPacketManage',
		  name: 'RedPacketManage',
		  component:RedPacketManage,
		  
		},
		{
		  path: '/Home/TaskManage',
		  name: 'TaskManage',
		  component:TaskManage
		},
		{
		  path: '/Home/MyCenter',
		  name: 'MyCenter',
		  component:MyCenter,
		  
		},
		{
		  path: '/Home/Evaluation',
		  name: 'Evaluation',
		  component:Evaluation
		},
		{
		  path: '/Home/CustomerSerivce',
		  name: 'CustomerSerivce',
		  component:CustomerSerivce
		},
		{
		  path: '/Home/About',
		  name: 'About',
		  component:About
		},
		{
		  path: '/Home/Welcome',
		  name: 'Welcome',
		  component:Welcome
		},
		{
		  path: '/Home/Food',
		  name: 'Food',
		  component:Food
		},
		{
		  path: '/Home/Order',
		  name: 'Order',
		  component:Order,
		  
		},
		{
		  path: '/Home/Register',
		  name: 'Register',
		  component:Register,
		  
		},
		{
		  path: '/Home/Login',
		  name: 'Login',
		  component:Login,
		  
		},
	]
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
	if(to.name=="RedPacketManage"||to.name=="MyCenter"||to.name=="Order"||to.name=="TaskManage"){
		if(!store.getters.getIsLogin){
			next({
				name:'Login'
			});
			
			return;
		}
	}
	next();
	
})
export default router
