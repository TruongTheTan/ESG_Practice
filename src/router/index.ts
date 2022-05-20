import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MainContent from '../components/Home/MainContent.vue';
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
   {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
         { path: '/', name: 'mainContent', component: MainContent },
         { path: '/employee', name: 'employee', component: () => import('@/views/EmployeeView.vue') },
         {
            path: '/employee/:id',
            name: 'employeeDetails',
            component: () => import('@/views/EmployeeDetailsView.vue'),
         },
      ],
   },
   {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
   },
];

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes,
});

export default router;
