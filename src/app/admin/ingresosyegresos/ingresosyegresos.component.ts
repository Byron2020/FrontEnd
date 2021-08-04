import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingresosyegresos',
  templateUrl: './ingresosyegresos.component.html',
  styleUrls: ['./ingresosyegresos.component.css']
})
export class IngresosyegresosComponent implements OnInit {

  constructor() { }

  AdminTitle:string;

  ngOnInit(): void {
    this.AdminTitle="INGRESOS Y EGRESOS";
  }

}
