import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-search-sc',
  templateUrl: './search-sc.component.html',
  styleUrls: ['./search-sc.component.css']
})
export class SearchScComponent implements OnInit {
  constructor(private service:ApiService) { }
  @Input() sc:any;

  id_socio: string;
  nomb_socio: string;
  apel_socio: string;
  corr_socio: string;
  dire_socio: string;
  celu_socio: string;
  id_estado: string;
  id_tiposocio: string;

  dato_search:string;
  SociosList: any;
  estados: any = [];
  tiposocios: any = [];

  ModalTitle: string;

  resp: any;
  max: any;
  AdminTitle:string;
  ActivatedAddEditSociosComp:boolean=false;


  ngOnInit(): void {
    this.id_socio=this.sc.id_socio;
    this.nomb_socio=this.sc.nomb_socio;
    this.apel_socio=this.sc.apel_socio;
    this.corr_socio=this.sc.corr_socio;
    this.celu_socio=this.sc.celu_socio;
    this.dire_socio=this.sc.dire_socio;
    this.id_tiposocio=this.sc.id_tiposocio;
    this.refreshSociosList();
  }

  addSociosClick(){
    this.sc={
      id_socio:0
    }
    this.ModalTitle="Nuevos datos";
    this.ActivatedAddEditSociosComp=true;
  }

  editSociosClick(item){
    console.log(item);
    this.sc=item;
    this.ModalTitle="Editar datos";
    this.ActivatedAddEditSociosComp=true;
  }
  buscarSociosClick(item){
    console.log(this.dato_search);
    this.service.searchSocios(this.dato_search).subscribe(data => {
      if(data=="Dato no encontrado" || this.dato_search==null)
      {this.SociosList=" "}
      else{this.SociosList = data;}
    });
  }
  deleteSociosClick(item){
    if(confirm("Esta seguro?")){
      this.service.deleteSocios(item.id_socio).subscribe(data=>{
        alert(data.toString());
        this.buscarSociosClick(item);
      });
    }
  }

  updateSociosCuentas(){
    var val= {
      id_socio:this.id_socio,
      id_tiposocio:this.id_tiposocio,
      id_estado:this.id_estado,
      nomb_socio:this.nomb_socio,
      apel_socio:this.apel_socio,
      corr_socio:this.corr_socio,
      dire_socio:this.dire_socio,
      celu_socio:this.celu_socio
    };
    this.service.updateSocios(val).subscribe(res=>{
      alert(res.toString());
    });
  }
  
  closeClick(){
    this.ActivatedAddEditSociosComp=false;
    this.refreshSociosList();
    this.dato_search=null;
  }

  refreshSociosList() {
    this.service.getSociosList(1).subscribe(data => {
      this.SociosList = data;
    });
  }
  
  refreshSociosSearch() {
    this.service.searchSocios(this.dato_search).subscribe(data => {
      if(data=="Dato no encontrado")
      {this.SociosList=" "}
      else{this.SociosList = data;}
    });
  }
}
