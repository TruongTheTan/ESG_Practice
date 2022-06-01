<template>
   <v-sheet color="transparent">
      <main style="height: auto">
         <h3>Top 10 employees with highest salary</h3>
         <div class="d-flex flex-wrap" style="height: 30%; overflow-y: auto">
            <!-- <v-card
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
            </v-card> -->

            <v-card
               v-for="employee in top10Employees"
               :key="employee.getID()"
               class="rounded-md card mx-2 mb-3"
               :width="width"
               :height="height"
               >ID: {{ employee.getID() }} <br />
               Name: {{ employee.getName() }} <br />
               Age: {{ employee.getAge() }} <br />
               Salary: {{ employee.getSalary() }} $ <br />
               Department: {{ employee.getDepartmentId() }} <br />
            </v-card>
         </div>

         <v-divider></v-divider>

         <h3 class="mt-5">Employees in department with highest salary</h3>
         <div class="d-flex flex-wrap" style="height: 30%; overflow-y: auto">
            <!-- <v-card
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
            </v-card> -->

            <v-card
               v-for="employee in employeeHighestDept"
               :key="employee.getID()"
               class="rounded-md card mx-2 mb-3"
               :width="width"
               :height="height"
               >ID: {{ employee.getID() }} <br />
               Name: {{ employee.getName() }} <br />
               Age: {{ employee.getAge() }} <br />
               Salary: {{ employee.getSalary() }} $ <br />
               Department: {{ employee.getDepartmentId() }} <br />
            </v-card>
         </div>
      </main>
   </v-sheet>
</template>

<script lang="ts">
   //import Employee from '@/Models/Employee';
   import { Vue, Component, Prop } from 'vue-property-decorator';
   //import data from '@/assets/data/Data';
   //import Department from '@/Models/Department';

   //import departmentData from '@/viewmodels/Department';
   import { Department } from '@/viewmodels/Department';
   import employeeData from '@/viewmodels/Employee';
   import { Employee } from '@/viewmodels/Employee';

   @Component
   export default class MainContent extends Vue {
      top10Employees!: Employee[];
      employeeHighestDept!: Employee[];

      @Prop(Array) readonly employeeList!: Employee[];
      @Prop(Array) readonly departmentList!: Department[];

      //(Hook) Find top 10, employees in highest department
      created() {
         this.top10Employees = employeeData.findTop10Employees;
         this.employeeHighestDept = employeeData.employeeInHighestDepartmentSalary(this.departmentList);
      }

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
      }
   }
</script>

<style lang="scss" scoped></style>
