import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-show-ie',
  templateUrl: './show-ie.component.html',
  styleUrls: ['./show-ie.component.css']
})
export class ShowIeComponent implements OnInit {

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
