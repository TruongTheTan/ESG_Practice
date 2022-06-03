<template>
   <!-- <v-sheet color="transparent">
      <v-row justify="center">
         <v-col cols="12" xl="12" lg="12" md="12" sm="8" xs="8">
            <div>
               <h3>Top 10 employees with highest salary</h3>
               <div class="d-flex flex-wrap" style="height: 30%">
                  <v-card
                     width="45%"
                     v-for="employee in top10Employees"
                     :key="employee.ID"
                     class="rounded-md card mx-2 mb-3"
                     >ID: {{ employee.ID }} <br />
                     Name: {{ employee.name }} <br />
                     Age: {{ employee.age }} <br />
                     Salary: {{ employee.salary }} $ <br />
                     Department: {{ employee.departmentId }} <br />
                  </v-card>
               </div>
            </div>

            <v-divider></v-divider>
            <div>
               <h3>Top 10 employees with highest salary</h3>
               <div class="d-flex flex-wrap" style="height: 30%">
                  <v-card
                     width="265"
                     v-for="employee in employeeHighestDept"
                     :key="employee.ID"
                     class="rounded-md card mx-2 mb-3"
                     >ID: {{ employee.ID }} <br />
                     Name: {{ employee.name }} <br />
                     Age: {{ employee.age }} <br />
                     Salary: {{ employee.salary }} $ <br />
                     Department: {{ employee.departmentId }} <br />
                  </v-card>
               </div>
            </div>
         </v-col>
      </v-row>
   </v-sheet> -->
   <!-- </v-col>
      </v-row> -->
   <!-- <v-row>
         <v-col class="grey lighten-5" cols="12" xl="12" lg="12" md="12" sm="8"> -->
   <!-- <div class="grey lighten-5">
      
      <h3>Top Employees</h3>
      <v-row class="pa-5 flex-row" outlined tile>
         <v-col
            xl="2"
            lg="4"
            md="2"
            sm="4"
            width="30%"
            height="200"
            v-for="e in top10Employees"
            :key="e.ID"
            class="rounded-md card mx-1 mb-3"
            outlined
            tile
            align="center"
         >
            <div align="center" justify="center">Name: {{ e.name }}</div>
            <div align="center" justify="center">Age: {{ e.age }}</div>
            <div align="center" justify="center">Salary: {{ e.salary }}</div>
         </v-col>
      </v-row>
      
      <v-row>
         <v-col class="grey lighten-5" cols="12" xl="12" lg="8" md="8" sm="6">
            <h3>Top Salary</h3>
            <v-row class="pa-5 flex-row" outlined tile>
               <v-card
                  width="30%"
                  height="170"
                  class="rounded-md card mx-1 mb-3"
                  outlined
                  tile
                  v-for="ed in employeeHighestDept"
                  :key="ed.ID"
               >
                  <div align="center" justify="center">Name: {{ ed.name }}</div>
                  <div align="center" justify="center">Age: {{ ed.age }}</div>
                  <div align="center" justify="center">Salary: {{ ed.salary }}</div>
               </v-card>
            </v-row>
         </v-col>
      </v-row>
   </div> -->

   <!-- <v-sheet color="transparent">
      <main style="height: auto">
         <h3>Top 10 employees with highest salary</h3>
         <div class="d-flex flex-wrap" style="height: 30%; overflow-y: auto">
            <v-card
               v-for="employee in top10Employees"
               :key="employee.ID"
               class="rounded-md card mx-2 mb-3"
               :width="width"
               :height="height"
               >ID: {{ employee.ID }} <br />
               Name: {{ employee.name }} <br />
               Age: {{ employee.age }} <br />
               Salary: {{ employee.salary }} $ <br />
               Department: {{ employee.departmentId }} <br />
            </v-card>
         </div>

         <v-divider></v-divider>

         <h3 class="mt-5">Employees in department with highest salary</h3>
         <div class="d-flex flex-wrap" style="height: 30%; overflow-y: auto">
            <v-card
               v-for="employee in employeeHighestDept"
               :key="employee.ID"
               class="rounded-md card mx-2 mb-3"
               :width="width"
               :height="height"
               >ID: {{ employee.ID }} <br />
               Name: {{ employee.name }} <br />
               Age: {{ employee.age }} <br />
               Salary: {{ employee.salary }} $ <br />
               Department: {{ employee.departmentId }} <br />
            </v-card>
         </div>
      </main>
   </v-sheet> -->

   <v-row class="px-6">
      <h3 class="mt-6 mb-2 ml-2">Top 10 employees with highest salary</h3>
      <v-row>
         <v-col cols="12" lg="3" md="4" sm="6" xs="2" v-for="employee in top10Employees" :key="employee.ID">
            <v-card class="rounded-md card mx-2 mb-3">
               ID: {{ employee.ID }} <br />
               Name: {{ employee.name }} <br />
               Age: {{ employee.age }} <br />
               Salary: {{ employee.salary }} <br />
               Department: {{ employee.departmentId }} <br />
            </v-card>
         </v-col>
      </v-row>

      <h3 class="mt-6 mb-2 ml-2">Employees in department with highest salary</h3>
      <v-row>
         <v-col cols="12" lg="3" md="4" sm="6" xs="10" v-for="employee in employeeHighestDept" :key="employee.ID">
            <v-card class="rounded-md card mx-2 mb-3">
               ID: {{ employee.ID }} <br />
               Name: {{ employee.name }} <br />
               Age: {{ employee.age }} <br />
               Salary: {{ employee.salary }} <br />
               Department: {{ employee.departmentId }} <br />
            </v-card>
         </v-col>
      </v-row>
   </v-row>
</template>

<script lang="ts">
   import { Vue, Component, Prop } from 'vue-property-decorator';

   import { Department } from '@/Models/Department';

   import employeeData, { Employee } from '@/Models/Employee';

   @Component
   export default class MainContent extends Vue {
      top10Employees!: Employee[];
      employeeHighestDept!: Employee[];

      @Prop() readonly employeeList!: Employee[];
      @Prop() readonly departmentList!: Department[];

      //(Hook) Find top 10, employees in highest department
      created() {
         this.top10Employees = employeeData.findTop10Employees;
         this.employeeHighestDept = employeeData.employeeInHighestDepartmentSalary(this.departmentList);
      }

      /*
      // use for responsive
      get width() {
         switch (this.$vuetify.breakpoint.name) {
            case 'xs':
               return '100%';
            case 'sm':
               return '43%';
            case 'md':
               return '29%';
            case 'lg':
            case 'xl':
               return '23%';

            default:
               return 0;
         }
      }

      get height() {
         switch (this.$vuetify.breakpoint.name) {
            case 'xs':
            case 'sm':
            case 'md':
            case 'lg':
               return '90%';
            case 'xl':
               return '40%';

            default:
               return 0;
         }
      }*/
   }
</script>

<style lang="scss" scoped></style>
