import { Employee } from './Employee';

export class Department {
   private ID: number;
   private name: string;
   private employeeList: Employee[];

   constructor(ID: number, name: string, employeeList: Employee[]) {
      this.ID = ID;
      this.name = name;
      this.employeeList = employeeList;
   }
   public getID(): number {
      return this.ID;
   }

   public setID(ID: number): void {
      this.ID = ID;
   }

   public getName(): string {
      return this.name;
   }

   public setName(name: string): void {
      this.name = name;
   }

   public getEmployeeList(): Array<Employee> {
      return this.employeeList;
   }

   public setEmployeeList(employeeList: Array<Employee>): void {
      this.employeeList = employeeList;
   }
}

class DepartmentData {
   loadDepartmentsList(departmentList: Department[], employeeList: Employee[]): void {
      for (let i = 1; i <= 3; i++) {
         const employeeInDepartment = employeeList.filter((employee) => employee.getDepartmentId() == i);
         departmentList.push(new Department(i, 'Department ' + i.toString(), employeeInDepartment));
      }
   }
}
const departmentData = new DepartmentData();
export default departmentData;
