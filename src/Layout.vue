<template>
   <v-app>
      <nav-bar />
      <side-bar />

      <v-main>
         <v-container>
            <router-view
               @reload-employee-list="reloadEmployeeList"
               :department-list="departmentList"
               :employee-list="employeeList"
            />
         </v-container>
         <Footer />
      </v-main>
   </v-app>
</template>

<script lang="ts">
   import { Vue, Component, Provide } from 'vue-property-decorator';

   import NavBar from '@/components/Home/NavBar.vue';
   import SideBar from '@/components/Home/SideBar.vue';
   import Footer from '@/components/Home/Footer.vue';

   import employeeData, { Employee } from '@/Models/Employee';
   import { Department, DepartmentData } from '@/Models/Department';

   @Component({ components: { NavBar, SideBar, Footer } })
   export default class Layout extends Vue {
      @Provide() readonly departmentList: Department[] = [];

      employeeList: Employee[] = employeeData.getEmployeeList;

      // (Hook) Get all data when vue is created
      created() {
         new DepartmentData().loadDepartmentsList(this.departmentList);
      }

      reloadEmployeeList(newEmployeeList: Employee[]) {
         this.employeeList = newEmployeeList;
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
