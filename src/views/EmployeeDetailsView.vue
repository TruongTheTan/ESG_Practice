<template>
   <div class="px-auto">
      <h1>Employee Details</h1>
      <v-form ref="form" lazy-validation>
         <v-text-field disabled readonly label="ID" v-model.number="employeeID"></v-text-field>

         <v-text-field clearable :rules="rules" label="Name" required v-model="employeeName"></v-text-field>

         <v-text-field
            clearable
            type="number"
            :rules="ageRule"
            label="Age"
            required
            v-model.number="employeeAge"
         ></v-text-field>

         <v-text-field
            clearable
            type="number"
            :rules="salaryRule"
            label="Salary ($)"
            required
            v-model.number="employeeSalary"
         ></v-text-field>

         <v-select
            v-model.number="employeeDepartmentID"
            :items="departmentList"
            item-text="name"
            item-value="ID"
            label="Department"
            required
         ></v-select>

         <v-dialog v-model="openDialog" max-width="300">
            <template v-slot:activator="{ on, attrs }">
               <v-btn color="success" dark v-bind="attrs" v-on="on"> Update </v-btn>
            </template>
            <v-card>
               <v-card-title class="text-h6"> Do you want to update this Employee ? </v-card-title>
               <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="openDialog = false"> Disagree </v-btn>
                  <v-btn color="green darken-1" text @click="updateEmployee()"> Agree </v-btn>
               </v-card-actions>
            </v-card>
         </v-dialog>
      </v-form>

      <v-snackbar top color="#4caf50" v-model="snackBar" :timeout="2000">
         Employee updated successfully<br />
         Redirecting to employee list page

         <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackBar = false"> Close </v-btn>
         </template>
      </v-snackbar>
   </div>
</template>
<script lang="ts">
   import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

   import { Department } from '@/Models/Department';
   import employeeData, { Employee } from '@/Models/Employee';
   import EmployeeDetailsViewModel from '@/viewmodels/EmployeeDetails.ViewModels';

   @Component
   export default class EmployeeDetailsView extends Vue {
      snackBar = false;
      openDialog = false;

      /* eslint-disable */
      employeeID!: number;
      employeeName!: string;
      employeeAge!: number;
      employeeSalary!: number;
      employeeDepartmentID!: number;

      employeeDetailsViewModel = new EmployeeDetailsViewModel();

      rules = [(v: any) => !!v || 'Required'];
      ageRule = [(v: any) => !!v || 'Required', (v: any) => v > 20 || 'Age must greater than 20'];
      salaryRule = [(v: any) => !!v || 'Required', (v: any) => v > 0 || 'Salary must greater than 0'];

      @Prop() readonly departmentList!: Department[];

      //(Hook) Find an employee and binding datas to text fields
      created() {
         const employee = employeeData.findEmployeeByID(parseInt(this.$route.params.id));

         this.employeeID = employee.ID;
         this.employeeName = employee.name;
         this.employeeAge = employee.age;
         this.employeeSalary = employee.salary;
         this.employeeDepartmentID = employee.departmentId;
      }

      @Emit('reload-employee-list')
      updateEmployee() {
         const employeeUpdate: Employee = {
            ID: this.employeeID,
            name: this.employeeName,
            age: this.employeeAge,
            salary: this.employeeSalary,
            departmentId: this.employeeDepartmentID,
         };

         const employeeIsUpdated = this.employeeDetailsViewModel.updateEmployee(employeeUpdate);

         // Return new employee list after update employee
         if (employeeIsUpdated) {
            this.snackBar = true;
            this.openDialog = false;
         }

         return employeeData.getEmployeeList;
      }
   }
</script>

<style scoped></style>
