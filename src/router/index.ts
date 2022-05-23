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

            // Authentication
            beforeEnter: (to, from, next) => {
               // Check is login
               if (sessionStorage.getItem('username')) next();
               // Redirect to login page
               else {
                  alert('You not login yet');
                  next('/login');
               }
            },
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
