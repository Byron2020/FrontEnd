import { ShowCtComponent } from './../show-ct/show-ct.component';
import { ApiService } from './../../../servicios/api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-edit-ct',
  templateUrl: './add-edit-ct.component.html',
  styleUrls: ['./add-edit-ct.component.css']
})
export class AddEditCtComponent implements OnInit {

  constructor(private service: ApiService) { }

  @Input() ct: any;
  id_cuentas: string;
  codi_cuentas: string;
  nomb_cuentas: string;
  id_grupocuentas: string;
  id_subgrupocuentas: string;

  GrupoCuentasList: any = [];
  SubGrupoCuentasList: any = [];
  AdminTitle:string;

  verGrupo: any;
  verSubGrupo: any;

  resp:any;
  max:any;

  ngOnInit(): void {
    this.AdminTitle="Nuevos Datos";
    this.loadGrupocuentas();
  }

  loadGrupocuentas() {
    this.service.getAllGrupoCuentas().subscribe((data: any) => {
      this.GrupoCuentasList = data;
      this.id_cuentas = this.ct.id_cuentas;
      this.id_grupocuentas = this.ct.id_grupocuentas;
      this.id_subgrupocuentas = this.ct.id_subgrupocuentas;
      this.codi_cuentas = this.ct.codi_cuentas;
      this.nomb_cuentas = this.ct.nomb_cuentas;
    });
  }

  loadSubGrupocuentas() {
    this.service.getSubGrupoCuentas(this.id_grupocuentas).subscribe((data: any) => {
      this.SubGrupoCuentasList = data;
    });
  }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.service.getIdCuentas(this.id_subgrupocuentas).subscribe((data:any)=>{
      this.resp=data[0].id_cuentas;
      console.log("resp del Id");
      console.log(this.resp);
      if(this.resp==null){
        this.max=1;
      }
      else{
        this.max=this.resp+1;
      }

    this.verGrupo = this.id_grupocuentas;
    this.verSubGrupo = this.id_subgrupocuentas;
    this.codi_cuentas = this.verGrupo + this.verSubGrupo+this.max;
    });
    
    
  }

  addCuentas() {
    var val = {
      id_cuentas: this.id_cuentas,
      id_grupocuentas: this.id_grupocuentas,
      id_subgrupocuentas: this.id_subgrupocuentas,
      codi_cuentas: this.codi_cuentas,
      nomb_cuentas: this.nomb_cuentas
    };
    this.service.addCuenta(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateCuentas() {
    var val = {
      id_cuentas: this.id_cuentas,
      id_grupocuentas: this.id_grupocuentas,
      id_subgrupocuentas: this.id_subgrupocuentas,
      codi_cuentas: this.codi_cuentas,
      nomb_cuentas: this.nomb_cuentas
    };
    console.log("Valor del Editar Cuenats");
    console.log(val);
    this.service.updateCuenta(val).subscribe(res => {
      alert(res.toString());
    });
  }


}
