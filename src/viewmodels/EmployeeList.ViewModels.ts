import router from '@/router';

import employeeData, { Employee } from '@/Models/Employee';

export default class EmployeesListViewModel {
   employeeDetails(employee: Employee) {
      router.push('/employee/' + employee.ID);
   }

   searchByDeptName(departmentNumber: number): Employee[] {
      return employeeData.searchByDeptName(departmentNumber);
   }
}
