import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Layout from '@/Layout.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
   {
      path: '/',
      name: 'Layout',
      component: Layout,

      children: [
         { path: '/', name: 'HomeView', component: () => import('@/views/HomeView.vue') },
         { path: '/employee', name: 'employeeListView', component: () => import('@/views/EmployeeListView.vue') },
         {
            path: '/employee/:id',
            name: 'employeeDetailsView' /*
            // Authentication
            beforeEnter: (to, from, next) => {
               // Check is login
               if (sessionStorage.getItem('username')) next();
               // Redirect to login page
               else {
                  const confirmLogin = confirm('You not login yet\nDo you want to login now ?');

                  if (confirmLogin) next('/login');

                  next(false);
               }
            },*/,
            component: () => import('@/views/EmployeeDetailsView.vue'),
         },
      ],
   },
   { path: '/login', name: 'loginView', component: () => import('../views/LoginView.vue') },
];

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes,
});

router.beforeEach((to, from, next) => {
   if (to.path !== '/login') {
      // Check is login
      if (sessionStorage.getItem('username')) next();
      // Redirect to login page
      else {
         const confirmLogin = confirm('You not login yet\nDo you want to login now ?');

         if (confirmLogin) next('/login');

         next(false);
      }
   } else {
      next();
   }
   return false;
});
export default router;
