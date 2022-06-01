<template>
   <v-card>
      <Auto-Complete @department-found="searchByDeptName" />

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
   import { Component, Vue, Prop } from 'vue-property-decorator';
   import AutoComplete from '../components/Home/AutoComplete.vue';

   import { Employee } from '@/viewmodels/Employee';
   import employeeData from '@/viewmodels/Employee';

   @Component({
      components: { AutoComplete },
   })
   export default class extends Vue {
      search = '';

      employeeListFound: Employee[] = [];

      @Prop(Array) readonly employeeList!: Employee[];

      headers = [
         { text: 'ID', value: 'ID', align: 'center' },
         { text: 'Name', value: 'name', align: 'center' },
         { text: 'Age', value: 'age', align: 'center' },
         { text: 'Salary ($)', value: 'salary', align: 'center' },
         { text: 'Department number', value: 'departmentId', align: 'center' },
      ];

      employeeDetails(employee: Employee) {
         this.$router.push('/employee/' + employee.getID());
      }

      searchByDeptName(departmentNumber: number) {
         this.employeeListFound = employeeData.searchByDeptName(departmentNumber);
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
