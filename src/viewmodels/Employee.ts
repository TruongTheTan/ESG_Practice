import { action, computed, observable } from 'mobx';
import { Department } from './Department';

export class Employee {
   private readonly ID: number;
   private name: string;
   private age: number;
   private salary: number;
   private departmentId: number;

   constructor(id: number, name: string, age: number, salary: number, departmentId: number) {
      this.ID = id;
      this.name = name;
      this.age = age;
      this.salary = salary;
      this.departmentId = departmentId;
   }
   public getID(): number {
      return this.ID;
   }

   // public setID(ID: number): void {
   //    this.ID = ID;
   // }

   public getName(): string {
      return this.name;
   }

   public setName(name: string): void {
      this.name = name;
   }

   public getAge(): number {
      return this.age;
   }

   public setAge(age: number): void {
      this.age = age;
   }

   public getSalary(): number {
      return this.salary;
   }

   public setSalary(salary: number): void {
      this.salary = salary;
   }

   public getDepartmentId(): number {
      return this.departmentId;
   }

   public setDepartmentId(departmentId: number): void {
      this.departmentId = departmentId;
   }
}

class EmployeeData {
   @observable
   private readonly employeeList: Employee[] = [
      new Employee(1, 'cuong', 23, 700, 3),
      new Employee(2, 'tan', 23, 399, 1),
      new Employee(3, 'lan', 23, 50, 2),
      new Employee(4, 'alexander', 23, 75, 3),
      new Employee(5, 'donald trump', 23, 700, 1),
      new Employee(6, 'joe biden', 23, 462, 1),
      new Employee(7, 'anwar', 23, 444, 1),
      new Employee(8, 'haha123', 23, 444, 3),
      new Employee(9, 'lan', 23, 1000, 2),
      new Employee(10, 'cuong', 23, 200, 2),
      new Employee(11, 'Uncle roger', 23, 788, 3),
      new Employee(12, 'hickey', 23, 500, 1),
      new Employee(13, 'le van luyen', 23, 700, 1),
      new Employee(14, 'John Cena', 23, 700, 1),
      new Employee(15, 'the tan', 23, 2000, 3),
      new Employee(16, 'AC-130', 23, 490, 1),
      new Employee(17, 'cuong', 23, 500, 2),
      new Employee(18, 'manager', 23, 250, 2),
   ];

   @computed
   get getEmployeeList(): Employee[] {
      return this.employeeList;
   }

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
   get findTop10Employees(): Employee[] {
      return this.employeeList.sort((a, b) => b.getSalary() - a.getSalary()).slice(0, 10);
   }

   employeeInHighestDepartmentSalary(departmentList: Department[]): Employee[] {
      let departmentID = 0;

      let highestSalary = 0;

      // iterate over the department list
      departmentList.forEach((department) => {
         let totalSalary = 0;

         // get all employee in current department
         const employeeListInCurrentDepartment: Employee[] = this.employeeList.filter(
            (employee) => employee.getDepartmentId() === department.getID()
         );

         // calculate total salary of employees in current department
         employeeListInCurrentDepartment.forEach((employee) => {
            totalSalary += employee.getSalary();
         });

         // Find the highest department salary
         if (totalSalary > highestSalary) {
            highestSalary = totalSalary;
            departmentID = department.getID();
         }
      });

      // Return all the employees in the department
      return this.employeeList.filter((employee) => employee.getDepartmentId() === departmentID);
   }

   searchByDeptName(departmentNumber: number): Employee[] {
      return this.employeeList.filter((employee) => employee.getDepartmentId() == departmentNumber);
   }

   findEmployeeByID(ID: number): Employee {
      return this.employeeList.find((employee) => employee.getID() === ID) as Employee;
   }
}

const employeeData = new EmployeeData();
export default employeeData;
