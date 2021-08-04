import { ApiService } from './../../../servicios/api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-show-ct',
  templateUrl: './show-ct.component.html',
  styleUrls: ['./show-ct.component.css']
})
export class ShowCtComponent implements OnInit {

  constructor(private service: ApiService) { }

  CuentasList:any=[];
  ModalTitle:string;
  ActivatedAddEditCtasComp:boolean=false;
  ct:any;
  p:number=1;

  ngOnInit(): void {
    this.refreshCuentasList();
  }

  editClick(item){
    this.ct=item;
    this.ModalTitle="Editar datos";
    this.ActivatedAddEditCtasComp=true;
  }

  deleteClick(item){
    if(confirm("Esta seguro?")){
      this.service.deleteCuenta(item.id_cuentas).subscribe(data=>{
        alert(data.toString());
        this.refreshCuentasList();
      });
    }
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
