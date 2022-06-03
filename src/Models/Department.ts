import employeeData, { Employee } from './Employee';

export interface Department {
   readonly ID: number;
   name: string;
   readonly employeeList: Employee[];
}

export class DepartmentData {
   //
   loadDepartmentsList(departmentList: Department[]): void {
      for (let i = 1; i <= 3; i++) {
         const employeeList = employeeData.getEmployeeList.filter((employee) => employee.departmentId == i);
         departmentList.push({ ID: i, name: 'Department ' + i.toString(), employeeList });
      }
   }
}

export default new DepartmentData();
