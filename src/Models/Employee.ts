import { action, computed, observable } from 'mobx';

import { Department } from './Department';

export interface Employee {
   readonly ID: number;
   name: string;
   age: number;
   salary: number;
   departmentId: number;
}

export class EmployeeData {
   @observable
   private readonly employeeList: Employee[] = [
      { ID: 1, name: 'cuong', age: 32, salary: 700, departmentId: 3 },
      { ID: 2, name: 'tan', age: 34, salary: 399, departmentId: 1 },
      { ID: 3, name: 'lannnnnnn', age: 63, salary: 50, departmentId: 2 },
      { ID: 4, name: 'alexander', age: 13, salary: 75, departmentId: 3 },
      { ID: 5, name: 'putin', age: 44, salary: 700, departmentId: 1 },
      { ID: 6, name: 'donald trump', age: 32, salary: 462, departmentId: 3 },
      { ID: 7, name: 'joe biden', age: 33, salary: 444, departmentId: 2 },
      { ID: 8, name: 'anwar', age: 45, salary: 444, departmentId: 2 },
      { ID: 9, name: 'haha123', age: 45, salary: 231, departmentId: 3 },
      { ID: 10, name: 'cuong', age: 63, salary: 1000, departmentId: 3 },
      { ID: 11, name: 'lan', age: 12, salary: 333, departmentId: 3 },
      { ID: 12, name: 'Uncle roger', age: 32, salary: 1000, departmentId: 1 },
      { ID: 13, name: 'hickey', age: 45, salary: 200, departmentId: 1 },
      { ID: 14, name: 'le van luyen', age: 32, salary: 788, departmentId: 1 },
      { ID: 15, name: 'Bình Gold', age: 65, salary: 2000, departmentId: 2 },
      { ID: 16, name: 'the tan', age: 23, salary: 500, departmentId: 2 },
      { ID: 17, name: 'manager', age: 32, salary: 250, departmentId: 2 },
   ];

   @action
   updateEmployee(employeeUpdate: Employee): void {
      const employeeInList = this.employeeList.find((employee) => employee.ID == employeeUpdate.ID) as Employee;

      employeeInList.name = employeeUpdate.name;
      employeeInList.age = employeeUpdate.age;
      employeeInList.salary = employeeUpdate.salary;
      employeeInList.departmentId = employeeUpdate.departmentId;
   }

   @computed
   get getEmployeeList(): Employee[] {
      return this.employeeList;
   }

   employeeInHighestDepartmentSalary(departmentList: Department[]): Employee[] {
      let highestDepartmentID = 0;

      let highestSalary = 0;

      // iterate over the department list
      departmentList.forEach((department) => {
         let totalSalary = 0;

         // get all employee in current department
         const employeeListInCurrentDepartment: Employee[] = this.employeeList.filter(
            (employee) => employee.departmentId === department.ID
         );

         // calculate total salary of employees in current department
         employeeListInCurrentDepartment.forEach((employee) => {
            totalSalary += employee.salary;
         });

         // Find the highest department salary
         if (totalSalary > highestSalary) {
            highestSalary = totalSalary;
            highestDepartmentID = department.ID;
         }
      });

      // Return all the employees in the department
      return this.employeeList.filter((employee) => employee.departmentId === highestDepartmentID);
   }

   @computed
   get findTop10Employees(): Employee[] {
      return this.employeeList.sort((a, b) => b.salary - a.salary).slice(0, 10);
   }

   searchByDeptName(departmentNumber: number): Employee[] {
      return this.employeeList.filter((employee) => employee.departmentId == departmentNumber);
   }

   findEmployeeByID(ID: number): Employee {
      return this.employeeList.find((employee) => employee.ID === ID) as Employee;
   }
}

export default new EmployeeData();
