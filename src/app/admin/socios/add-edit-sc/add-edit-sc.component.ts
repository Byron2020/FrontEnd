import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-add-edit-sc',
  templateUrl: './add-edit-sc.component.html',
  styleUrls: ['./add-edit-sc.component.css']
})
export class AddEditScComponent implements OnInit {

  constructor(private service:ApiService) { }

  @Input() sc:any;

  id_socio: number;
  id_tiposocio: string;
  id_estado: string;
  nomb_socio: string;
  apel_socio: string;
  corr_socio: string;
  dire_socio: string;
  celu_socio: string;


  dato_search:string;
  SociosList: any=[];
  estados: any = [];
  tiposocios: any = [];

  ModalTitle: string;
  currentUser:string;
  resp: any;
  max: any;
  AdminTitle:string;
  ActivatedAddEditSociosComp:boolean=false;

  ngOnInit(): void {
    this.AdminTitle="Nuevos Datos";
    this.loadSocios();
    this.estadosList();
    this.tiposociosList();
  }

  loadSocios() {
    this.service.getSociosList(1).subscribe((data: any) => {
      this.SociosList = data;
      this.id_socio=this.sc.id_socio;
      this.id_tiposocio=this.sc.id_tiposocio;
      this.id_estado=this.sc.id_estado;
      this.nomb_socio=this.sc.nomb_socio;
      this.apel_socio=this.sc.apel_socio;
      this.corr_socio=this.sc.corr_socio;
      this.celu_socio=this.sc.celu_socio;
      this.dire_socio=this.sc.dire_socio;     
      
    });
  }

  updateSocio() {
    var val = {
      id_socio:this.id_socio,
      id_tiposocio:this.id_tiposocio,
      id_estado:this.sc.id_estado,
      nomb_socio:this.sc.nomb_socio,
      apel_socio:this.sc.apel_socio,
      corr_socio:this.sc.corr_socio,
      celu_socio:this.sc.celu_socio,
      dire_socio:this.sc.dire_socio
      
    };
    this.service.updateSocios(val).subscribe(res => {
      alert(res.toString());
      this.refreshPerfil();
    });
  }
  estadosList() {
    this.service.getEstadosList().subscribe(data => {
      this.estados = data;
    });
  }
  refreshPerfil() {
    var user = localStorage.getItem('user');
    this.currentUser=user;
  }

  tiposociosList() {
    this.service.getTipoSociosList().subscribe(data => {
      this.tiposocios = data;
    });
  }
}
