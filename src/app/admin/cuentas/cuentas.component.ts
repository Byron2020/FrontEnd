
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { ShowCtComponent } from './show-ct/show-ct.component';
@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {

  CuentasList:any=[];
  ModalTitle:string;
  ActivatedAddEditCtasComp:boolean=false;
  @Input() ct:any;

  constructor(private service:ApiService) { }

  AdminTitle:string;

  showSubmenu: boolean = false;

  ngOnInit(): void {
    this.AdminTitle="CUENTAS";
  }

  addClick(){
    this.ct={
      id_cuentas:0,
      nomb_cuentas:""
    }
    console.log(this.ct);
    this.ModalTitle="Nuevos datos";
    this.ActivatedAddEditCtasComp=true;
  }

  closeClick(){
    this.ActivatedAddEditCtasComp=false;
    this.refreshCuentasList();
  }

  refreshCuentasList() {
    this.service.getCuentaList().subscribe(data => {
      this.CuentasList = data;
    });
  }
}
