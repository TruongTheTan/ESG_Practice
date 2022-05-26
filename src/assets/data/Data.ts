import Department from '@/Models/Department';
import Employee from '@/Models/Employee';
import { action, computed, observable } from 'mobx';

class Data {
   @observable
   private employeeList: Employee[] = [
      new Employee(1, 'cuong', 22, 700, 3),
      new Employee(2, 'tan', 32, 399, 2),
      new Employee(3, 'lan', 22, 711, 1),
      new Employee(4, 'alexander', 22, 50, 1),
      new Employee(5, 'putin', 28, 75, 2),
      new Employee(6, 'donald trump', 22, 700, 1),
      new Employee(7, 'joe biden', 27, 462, 3),
      new Employee(8, 'anwar', 12, 444, 2),
      new Employee(9, 'haha123', 26, 231, 1),
      new Employee(10, 'cuong', 32, 1000, 3),
      new Employee(11, 'lan', 32, 333, 2),
      new Employee(12, 'Uncle roger', 45, 1000, 2),
      new Employee(13, 'hickey', 12, 200, 3),
      new Employee(15, 'le van luyen', 38, 788, 1),
      new Employee(16, 'Ho chi minh', 60, 2000, 3),
      new Employee(17, 'the tan', 23, 500, 3),
      new Employee(18, 'manager', 40, 250, 1),
   ];

   @action
   updateEmployee(employeeUpdate: Employee): void {
      const employeeInList = this.employeeList.find(
         (employee) => employee.getID() == employeeUpdate.getID()
      ) as Employee;

      employeeInList.setName(employeeUpdate.getName());
      employeeInList.setAge(employeeUpdate.getAge());
      employeeInList.setSalary(employeeUpdate.getSalary());
      employeeInList.setDepartmentId(employeeUpdate.getDepartmentId());
   }

   @computed
   get getEmployeeList(): Array<Employee> {
      return this.employeeList;
   }

   loadDepartmentsList(departmentList: Array<Department>): void {
      for (let i = 1; i <= 3; i++) {
         const employeeList = this.employeeList.filter((employee) => employee.getDepartmentId() == i);
         departmentList.push(new Department(i, 'Department ' + i.toString(), employeeList));
      }
   }

   employeeInHighestDepartmentSalary(
      departmentList: Array<Department>,
      employeeList: Array<Employee>
   ): Array<Employee> {
      let highestDepartmentID = 0;

      let highestSalary = 0;

      // iterate over the department list
      departmentList.forEach((department) => {
         let totalSalary = 0;

         // get all employee in current department
         const employeeListInCurrentDepartment: Array<Employee> = employeeList.filter(
            (employee) => employee.getDepartmentId() === department.getID()
         );

         // calculate total salary of employees in current department
         employeeListInCurrentDepartment.forEach((employee) => {
            totalSalary += employee.getSalary();
         });

         // Find the highest department salary
         if (totalSalary > highestSalary) {
            highestSalary = totalSalary;
            highestDepartmentID = department.getID();
         }
      });

      // Return all the employees in the department
      return employeeList.filter((employee) => employee.getDepartmentId() === highestDepartmentID);
   }

   findTop10Employees(employeeList: Array<Employee>): Array<Employee> {
      return employeeList.sort((a, b) => b.getSalary() - a.getSalary()).slice(0, 10);
   }
}

const data = new Data();
export default data;
