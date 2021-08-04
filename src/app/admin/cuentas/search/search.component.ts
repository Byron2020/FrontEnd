import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/servicios/api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private service:ApiService) { }
  @Input() ct:any;
  dato_search:string;
  id_cuentas:string;
  codi_cuentas:string;
  nomb_cuentas:string;

  CuentasList:any=[];
  AdminTitle:string;
  AdminAction:string;
  ModalTitle:string;
  ActivatedAddEditCtasComp:boolean=false;


  ngOnInit(): void {
    this.id_cuentas=this.ct.id_cuentas;
    this.codi_cuentas=this.ct.codi_cuentas;
    this.nomb_cuentas=this.ct.nomb_cuentas;
    this.AdminAction="Buscar datos";
  }

  addClick(){
    this.ct={
      id_cuentas:0,
      nomb_cuentas:""
    }
    this.ModalTitle="Nuevos datos";
    this.ActivatedAddEditCtasComp=true;
  }

  editClick(item){
    console.log(item);
    this.ct=item;
    this.ModalTitle="Editar datos";
    this.ActivatedAddEditCtasComp=true;
  }
  buscarClick(item){
    console.log(this.dato_search);
    this.service.searchCuenta(this.dato_search).subscribe(data => {
      if(data=="Dato no encontrado" || this.dato_search==null)
      {this.CuentasList=" "}
      else{this.CuentasList = data;}
    });
  }
  deleteClick(item){
    if(confirm("Esta seguro?")){
      this.service.deleteCuenta(item.id_cuentas).subscribe(data=>{
        alert(data.toString());
        this.buscarClick(item);
      });
    }
  }

  updateCuentas(){
    var val= {id_cuentas:this.id_cuentas,
      codi_cuentas:this.codi_cuentas,
      nomb_cuentas:this.nomb_cuentas
    };
    this.service.updateCuenta(val).subscribe(res=>{
      alert(res.toString());
    });
  }
  
  closeClick(){
    this.ActivatedAddEditCtasComp=false;
    this.refreshCuentasList();
    this.dato_search=null;
  }

  refreshCuentasList() {
    this.service.getCuentaList().subscribe(data => {
      this.CuentasList = data;
    });
  }
  
  refreshSearch() {
    this.service.searchCuenta(this.dato_search).subscribe(data => {
      if(data=="Dato no encontrado")
      {this.CuentasList=" "}
      else{this.CuentasList = data;}
    });
  }
}
