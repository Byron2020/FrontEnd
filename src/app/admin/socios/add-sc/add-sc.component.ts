import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-add-sc',
  templateUrl: './add-sc.component.html',
  styleUrls: ['./add-sc.component.css']
})
export class AddScComponent implements OnInit {

  constructor(private service: ApiService) { }

  @Input() sc: any;
  id_socio: string;
  nomb_socio: string;
  apel_socio: string;
  corr_socio: string;
  dire_socio: string;
  celu_socio: string;
  id_estado: string;
  id_tiposocio: string;


  SociosList: any;
  estados: any = [];
  tiposocios: any = [];

  ModalTitle: string;

  resp: any;
  max: any;

  ngOnInit(): void {
    this.refreshSociosList();
    this.estadosList();
    this.tiposociosList();
    this.ModalTitle = "Nuevos Datos";
  }

  limpiarClick() {
    this.id_socio = "";
    this.nomb_socio = "";
    this.apel_socio = "";
    this.corr_socio = "";
    this.dire_socio = "";
    this.celu_socio = "";
    this.id_estado = "";
    this.id_tiposocio = "";
    this.refreshSociosList();
  }

  refreshSociosList() {
    this.service.getSociosList(1).subscribe(data => {
      this.sc = data;
    });
  }



  addSocios() {
    var val = {
      id_socio:this.id_socio,
      id_tiposocio:this.id_tiposocio,
      id_estado:this.id_estado,
      nomb_socio:this.nomb_socio,
      apel_socio:this.apel_socio,
      corr_socio:this.corr_socio,
      dire_socio:this.dire_socio,
      celu_socio:this.celu_socio
    };
    this.service.addSocios(val).subscribe(res => {
      alert(res.toString());
      this.limpiarClick();
    });
  }
  estadosList() {
    this.service.getEstadosList().subscribe(data => {
      this.estados = data;
    });
  }

  tiposociosList() {
    this.service.getTipoSociosList().subscribe(data => {
      this.tiposocios = data;
    });
  }
}
