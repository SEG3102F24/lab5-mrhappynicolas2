import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core'; 
import {Employee} from "../model/employee";
import {of, Observable } from "rxjs";
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common'; 
import {Firestore,
  collection,
  collectionData,
  Timestamp,
} from "@angular/fire/firestore"; 

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    standalone: true,
    imports: [RouterLink, NgFor, AsyncPipe, DatePipe]
})
export class EmployeesComponent implements OnInit { 
  private firestore:  Firestore = inject(Firestore); 

  employees$: Observable<any[]> = of([]); // Observable for employees list

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    const employee = collection(this.firestore, 'company', "Company1", 'employees');
    this.employees$ = collectionData(employee, {idField: 'id'}) as Observable<Employee[]>;
  }
  
  convertTimestamp(timestamp: Timestamp): Date {
    return timestamp.toDate();
  }

}
