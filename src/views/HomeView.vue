<template>
   <v-app>
      <nav-bar />
      <side-bar />

      <v-main>
         <v-container>
            <router-view
               :department-list="departmentList"
               :employee-list="employeeList"
               @reloadEmployeeList="reloadEmployeeList"
            />
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
      employeeList: Array<Employee> = [];

      readonly departmentList: Array<Department> = [];

      // (Hook) Get all data when vue is created
      created() {
         const data = new Data();
         data.loadDepartmentsList(this.departmentList);
         this.employeeList = data.getEmployeeList;
      }

      reloadEmployeeList(employeeList: Array<Employee>) {
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
