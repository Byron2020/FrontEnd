import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-show-lib',
  templateUrl: './show-lib.component.html',
  styleUrls: ['./show-lib.component.css']
})
export class ShowLibComponent implements OnInit {

  LibrosList:any=[];
  ModalTitle:string;
  ActivatedAddEditCtasComp:boolean=false;
  lib:any;
  p:number=1;

  constructor(private service: ApiService) { }


  ngOnInit(): void {
    //this.refreshCuentasList();
    this.refreshLibrosList();
  }

  editClick(item){
    this.lib=item;
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
      this.LibrosList = data;
    });
  }

  refreshLibrosList() {
    this.service.getLibroList().subscribe(data => {
      this.LibrosList = data;
    });
  }
}
