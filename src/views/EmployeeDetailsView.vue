<template>
   <v-main class="pt-0">
      <v-container>
         <h1>Employee Details</h1>
         <v-form ref="form" lazy-validation>
            <!-- ID -->
            <v-text-field disabled readonly label="ID" v-model="employeeID"></v-text-field>

            <!-- Name -->
            <v-text-field
               clearable
               :rules="rules"
               label="Name"
               required
               v-model="employeeName"
            ></v-text-field>

            <!-- Age -->
            <v-text-field
               clearable
               type="number"
               :rules="ageRule"
               label="Age"
               required
               v-model="employeeAge"
            ></v-text-field>

            <!-- salary -->
            <v-text-field
               clearable
               type="number"
               :rules="salaryRule"
               label="Salary ($)"
               required
               v-model="employeeSalary"
            ></v-text-field>

            <!-- department ID -->
            <v-select
               v-model="employeeDepartmentID"
               :items="departmentList"
               item-text="name"
               item-value="ID"
               label="Department"
               required
            ></v-select>

            <v-btn @click="updateEmployee()" color="success" class="mr-4"> Update </v-btn>
         </v-form>
      </v-container>
   </v-main>
</template>
<script lang="ts">
   if (sessionStorage.getItem('username') == null) {
      window.location.href = 'http://localhost:8080/login';
   }

   import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
   import Employee from '../Models/Employee';
   import Department from '../Models/Department';
   import Data from '../assets/data/Data';
   @Component
   export default class EmployeeDetailsView extends Vue {
      employeeID = -1;
      employeeName = '';
      employeeAge = -1;
      employeeSalary = -1;
      employeeDepartmentID = -1;

      rules = [(v: any) => !!v || 'Required'];
      ageRule = [(v: any) => !!v || 'Required', (v: any) => v > 20 || 'Age must greater than 20'];
      salaryRule = [(v: any) => !!v || 'Required', (v: any) => v > 0 || 'Salary must greater than 0'];

      @Prop(Array) employeeList: Array<Employee> = [];
      @Prop(Array) readonly departmentList: Array<Department> = [];

      //Hook
      created() {
         const employee = this.employeeList.find(
            (employee) => employee.getID() == parseInt(this.$route.params.id)
         )!;

         this.employeeID = employee.getID();
         this.employeeName = employee.getName();
         this.employeeAge = employee.getAge();
         this.employeeSalary = employee.getSalary();
         this.employeeDepartmentID = employee.getDepartmentId();
      }

      updateEmployee() {
         if (this.employeeName && this.employeeAge && this.employeeSalary) {
            if (this.employeeAge > 20 || this.employeeSalary > 0) {
               const data = new Data();
               data.updateEmployee(
                  new Employee(
                     this.employeeID,
                     this.employeeName,
                     this.employeeAge,
                     this.employeeSalary,
                     this.employeeDepartmentID
                  )
               );
               this.$emit('updateEmployee', data.getEmployeeList());
               this.$router.push('/employee');
            } else alert('Age must greater than 20\nSalary must greater than 0');
         } else {
            alert('Must fill in all the required fields');
         }
      }
   }
</script>

<style scoped></style>
