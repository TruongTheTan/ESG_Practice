import router from '@/router';
import employeeData, { Employee } from '@/Models/Employee';

export default class EmployeeDetailsViewModel {
   /**/

   updateEmployee(employeeUpdate: Employee): boolean {
      //
      if (this.validateInputFields(employeeUpdate)) {
         employeeData.updateEmployee(employeeUpdate);

         setTimeout(this.toEmployeeListPage, 1500);

         return true;
      }

      return false;
   }

   private validateInputFields(employeeUpdate: Employee): boolean {
      if (employeeUpdate.name && employeeUpdate.age && employeeUpdate.salary) {
         //
         if (employeeUpdate.age <= 20 || employeeUpdate.salary < 0) {
            alert('Age must greater than 20\nSalary must greater than 0');

            return false;
         }
      } else {
         alert('Must fill in all the required fields');
         return false;
      }

      return true;
   }

   private toEmployeeListPage(): void {
      router.push('/employee');
   }
}
