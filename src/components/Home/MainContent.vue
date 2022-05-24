<template>
   <v-sheet color="transparent">
      <main style="height: 100vh">
         <h3>Top 10 employees with highest salary</h3>
         <div class="d-flex flex-wrap" style="height: 30%; overflow-y: auto">
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
   import Employee from '@/Models/Employee';
   import { Vue, Component, Prop } from 'vue-property-decorator';
   import Data from '@/assets/data/Data';
   import Department from '@/Models/Department';
   @Component
   export default class MainContent extends Vue {
      employeeHighestDept: Array<Employee> = [];
      top10Employees: Array<Employee> = [];

      @Prop(Array) readonly employeeList!: Array<Employee>;
      @Prop(Array) readonly departmentList!: Array<Department>;

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

      // Find top 10 and employees in highest department
      created() {
         const data = new Data();

         this.top10Employees = data.findTop10Employees(this.employeeList);
         this.employeeHighestDept = data.employeeInHighestDepartmentSalary(this.departmentList, this.employeeList);
      }
   }
</script>

<style lang="scss" scoped></style>
