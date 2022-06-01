<template>
   <v-main class="pt-0">
      <v-container>
         <h1>Employee Details</h1>
         <v-form ref="form" lazy-validation>
            <!-- ID -->
            <v-text-field disabled readonly label="ID" v-model.number="employeeID"></v-text-field>

            <!-- Name -->
            <v-text-field clearable :rules="rules" label="Name" required v-model="employeeName"></v-text-field>

            <!-- Age -->
            <v-text-field
               clearable
               type="number"
               :rules="ageRule"
               label="Age"
               required
               v-model.number="employeeAge"
            ></v-text-field>

            <!-- salary -->
            <v-text-field
               clearable
               type="number"
               :rules="salaryRule"
               label="Salary ($)"
               required
               v-model.number="employeeSalary"
            ></v-text-field>

            <!-- Department -->
            <v-select
               v-model.number="employeeDepartmentID"
               :items="departmentList"
               item-text="name"
               item-value="ID"
               label="Department"
               required
            ></v-select>

            <v-dialog v-model="openDialog" persistent max-width="300">
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
      </v-container>
   </v-main>
</template>
<script lang="ts">
   import { Component, Vue, Prop } from 'vue-property-decorator';

   /*
   import Employee from '../Models/Employee';
   import Department from '../Models/Department';
   import data from '../assets/data/Data';
   */

   import { Department } from '@/viewmodels/Department';
   import { Employee } from '@/viewmodels/Employee';
   import employeeData from '@/viewmodels/Employee';

   //import departmentData from '@/viewmodels/Department';

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

      rules = [(v: any) => !!v || 'Required'];
      ageRule = [(v: any) => !!v || 'Required', (v: any) => v > 20 || 'Age must greater than 20'];
      salaryRule = [(v: any) => !!v || 'Required', (v: any) => v > 0 || 'Salary must greater than 0'];

      //@Prop(Array) readonly employeeList!: Employee[];
      @Prop(Array) readonly departmentList!: Department[];

      //(Hook) Find an employee and binding datas to text fields
      created() {
         const employee: Employee = employeeData.findEmployeeByID(parseInt(this.$route.params.id));

         this.employeeID = employee.getID();
         this.employeeName = employee.getName();
         this.employeeAge = employee.getAge();
         this.employeeSalary = employee.getSalary();
         this.employeeDepartmentID = employee.getDepartmentId();
      }

      updateEmployee() {
         // Required fields must not empty
         if (this.employeeName && this.employeeAge && this.employeeSalary)
            if (this.employeeAge > 20 || this.employeeSalary > 0) {
               const updateEmployee: Employee = new Employee(
                  this.employeeID,
                  this.employeeName,
                  this.employeeAge,
                  this.employeeSalary,
                  this.employeeDepartmentID
               );

               // Update employee
               //data.updateEmployee(updateEmployee);

               employeeData.updateEmployee(updateEmployee);

               this.snackBar = true;

               this.openDialog = false;

               setTimeout(this.toEmployeeListPage, 2500);
            } else alert('Age must greater than 20\nSalary must greater than 0');
         else alert('Must fill in all the required fields');
      }

      toEmployeeListPage() {
         this.$router.push('/employee');
      }
   }
</script>

<style scoped></style>
