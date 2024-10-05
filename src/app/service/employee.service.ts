import { inject, Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Employee} from "../model/employee";
 
import {Firestore,
  collection,
  collectionData,
  addDoc, 
} from "@angular/fire/firestore"; 

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees$: BehaviorSubject<readonly Employee[]> = new BehaviorSubject<readonly Employee[]>([]);

  private firestore:  Firestore = inject(Firestore); 

  get $(): Observable<readonly Employee[]> {
    return this.employees$;
  }

  addEmployee(employee: Employee) { 
    const employees = collection(this.firestore, 'company', "Company1", 'employees');
    delete employee.id;
    // @ts-ignore
    return addDoc(employees, {...employee});
     
  }

  getEmployees(): Observable<Employee[]>{
    const employee = collection(this.firestore, 'company', "Company1", 'employees');
    return collectionData(employee, {idField: 'id'}) as Observable<Employee[]>;
  }
}
