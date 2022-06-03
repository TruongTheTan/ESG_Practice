<template>
   <v-card>
      <Auto-Complete @department-found="searchByDeptName" />

      <v-data-table
         class="row-pointer"
         :items-per-page="10"
         :headers="headers"
         item-key="ID"
         :items="employeeListFound.length === 0 ? employeeList : employeeListFound"
         @click:row="employeeListViewModel.employeeDetails"
      >
      </v-data-table>
   </v-card>
</template>

<script lang="ts">
   import { Component, Vue, Prop } from 'vue-property-decorator';
   import AutoComplete from '@/components/Home/AutoComplete.vue';

   import { Employee } from '@/Models/Employee';
   import EmployeeListViewModel from '@/viewmodels/EmployeeList.ViewModels';

   @Component({ components: { AutoComplete } })
   export default class extends Vue {
      search = '';

      employeeListFound: Employee[] = [];

      @Prop() readonly employeeList!: Employee[];

      employeeListViewModel = new EmployeeListViewModel();

      headers = [
         { text: 'ID', value: 'ID', align: 'center' },
         { text: 'Name', value: 'name', align: 'center' },
         { text: 'Age', value: 'age', align: 'center' },
         { text: 'Salary ($)', value: 'salary', align: 'center' },
         { text: 'Department number', value: 'departmentId', align: 'center' },
      ];

      searchByDeptName(departmentNumber: number) {
         this.employeeListFound = this.employeeListViewModel.searchByDeptName(departmentNumber);
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
