<template>
   <v-app>
      <!-- <nav-bar @sideBarDrawer="sideBarDrawer" />
      <side-bar :group="group" :drawer="drawer" /> -->

      <v-app-bar class="purple darken-3 lighten-2" dark app>
         <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

         <v-toolbar-title>Title</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
         <v-list nav dense>
            <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
               <v-list-item>
                  <v-list-item-icon>
                     <v-icon>mdi-home</v-icon>
                  </v-list-item-icon>
                  <router-link to="/">
                     <v-list-item-title>Home</v-list-item-title>
                  </router-link>
               </v-list-item>

               <v-list-item>
                  <v-list-item-icon>
                     <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <router-link to="/employee">
                     <v-list-item-title>Employee List</v-list-item-title>
                  </router-link>
               </v-list-item>
            </v-list-item-group>
         </v-list>
      </v-navigation-drawer>
      <v-main>
         <v-container>
            <router-view
               :department-list="departmentList"
               :employee-list="employeeList"
               @updateEmployee="updateEmployee"
            ></router-view>
         </v-container>
      </v-main>

      <Footer />
   </v-app>
</template>

<script lang="ts">
   import { Vue, Component } from 'vue-property-decorator';

   import NavBar from '../components/Home/NavBar.vue';
   import SideBar from '../components/Home/SideBar.vue';
   import MainContent from '../components/Home/MainContent.vue';
   import Footer from '../components/Home/Footer.vue';

   import Department from '../Models/Department';
   import Employee from '../Models/Employee';
   import Data from '../assets/data/Data';

   @Component({
      components: { NavBar, SideBar, MainContent, Footer },
   })

   /** */
   export default class HomeView extends Vue {
      drawer = false;
      group = null;

      employeeList: Array<Employee> = [];
      departmentList: Array<Department> = [];
      top10Employees: Array<Employee> = [];
      employeesInHighestDept: Array<Employee> = [];

      created() {
         const data = new Data();

         data.loadDepartmentsList(this.departmentList);

         this.employeeList = data.getEmployeeList();

         this.employeesInHighestDept = data.employeeInHighestDepartmentSalary(
            this.departmentList,
            this.employeeList
         );

         this.top10Employees = data.findTop10Employees(this.employeeList);
      }

      updateEmployee(employeeList: Array<Employee>) {
         this.employeeList = employeeList;
      }
   }
</script>

<style lang="scss">
   html {
      height: 100vh;
   }

   #firstCol {
      width: 100vh;
      border-right-style: solid;
      border-right-color: #6573c3;
   }

   .center-text {
      align-items: center;
      font-size: 20px;
      vertical-align: middle;
   }

   .card {
      padding: 10px;
      border: 2px solid #6573c3 !important;
   }
</style>
