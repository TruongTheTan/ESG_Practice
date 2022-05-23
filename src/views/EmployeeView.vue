<template>
   <v-card>
      <v-card-title>
         <div>
            <h3>Employee List</h3>
            <h6>Click on table row to view employee details</h6>
         </div>

         <v-spacer></v-spacer>

         <!-- Search bar -->
         <v-autocomplete
            append-icon="mdi-magnify"
            label="Search by department"
            :items="departmentList"
            item-text="name"
            item-value="ID"
            single-line
            hide-details
            :search-input.sync="search"
         ></v-autocomplete>
      </v-card-title>

      <!-- Employee list -->
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
   import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
   import Employee from '@/Models/Employee';
   import Department from '../Models/Department';
   @Component
   export default class extends Vue {
      search = '';

      employeeListFound: Array<Employee> = [];

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
      searchByDeptName() {
         // If search box has values
         if (this.search.trim() !== '') {
            // get last number of search box
            // Ex: Department 3 => departmentNumber = 3
            let departmentNumber: number = parseInt(this.search.split(' ')[1].trim());

            // Get all employee corresponding to departmentNumber
            this.employeeListFound = this.employeeList.filter(
               (employee) => employee.getDepartmentId() == departmentNumber
            );

            // Empty the list if search box empty
         } else this.employeeListFound = [];
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
