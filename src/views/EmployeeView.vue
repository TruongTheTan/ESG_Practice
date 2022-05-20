<template>
   <v-card>
      <v-card-title>
         Employee List

         <v-spacer></v-spacer>

         <v-autocomplete
            append-icon="mdi-magnify"
            label="Search by department"
            :items="departmentListFound.length == 0 ? departmentList : departmentListFound"
            item-text="name"
            item-value="ID"
            single-line
            hide-details
            :search-input.sync="search"
         ></v-autocomplete>
      </v-card-title>
      <v-data-table
         class="row-pointer"
         :items-per-page="5"
         :headers="headers"
         item-key="ID"
         :items="employeeListFound.length === 0 ? employeeList : employeeListFound"
         @click:row="employeeDetails"
      >
      </v-data-table>
   </v-card>
</template>

<script lang="ts">
   if (sessionStorage.getItem('username') == null) {
      window.location.href = 'http://localhost:8080/login';
   }

   import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
   import Employee from '@/Models/Employee';
   import Department from '../Models/Department';
   @Component
   export default class extends Vue {
      search = '';

      employeeListFound: Array<Employee> = [];
      departmentListFound: Array<Department> = [];

      @Prop(Array) readonly employeeList: Array<Employee> = [];
      @Prop(Array) readonly departmentList: Array<Department> = [];

      headers = [
         { text: 'ID', value: 'ID', align: 'center' },
         { text: 'Name', value: 'name', align: 'center' },
         { text: 'Age', value: 'age', align: 'center' },
         { text: 'Salary ($)', value: 'salary', align: 'center' },
         { text: 'Department number', value: 'departmentId', align: 'center' },
      ];

      @Watch('search')
      searchByDept() {
         // If search box has values
         if (this.search.trim() != '') {
            // Department name found by search box
            this.departmentListFound = this.departmentList.filter((department) =>
               department.getName().includes(this.search)
            );

            // get last number of search box
            // Ex: Department 3 => departmentNumber = 3
            let departmentNumber: number = parseInt(this.search.split(' ')[1].trim());

            // Get all employee corresponding to departmentNumber
            this.employeeListFound = this.employeeList.filter(
               (employee) => employee.getDepartmentId() == departmentNumber
            );

            // Set all listfound to 0 in order to display default lists
         } else {
            this.departmentListFound.length = 0;
            this.employeeListFound.length = 0;
         }
      }

      employeeDetails(employee: Employee) {
         this.$router.push('/employee/' + employee.getID());
      }
   }
</script>

<style scoped>
   body {
      margin: 0;
      padding: 0;
   }

   .row-pointer >>> tbody tr :hover {
      cursor: pointer;
   }
</style>
