import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-add-as',
  templateUrl: './add-as.component.html',
  styleUrls: ['./add-as.component.css']
})
export class AddAsComponent implements OnInit {


  constructor(private service: ApiService) { }

  @Input() lib: any;
  @Input() ast: any;
  id_asiento: string;
  fechini_libdiario:string;
  fechfin_libdiario:string;
  nume_libdiario:string;

  id_asientos:string;
  id_libdiario:string;
  fech_asientos:string;
  obse_asientos:string;
  
  AsientosList: any = [];
  SubGrupoCuentasList: any = [];

  verGrupo: any;
  verSubGrupo: any;

  resp:any;
  max:any;

  ngOnInit(): void {
    this.loadAsientos();
    console.log("Init/ Add-ast");
    console.log(this.ast);
  }

  loadLibros() {
    this.service.getLibroList().subscribe((data: any) => {
      this.AsientosList = data;
      this.id_libdiario = this.lib.id_libdiario;
      this.fechini_libdiario = this.lib.fechini_libdiario;
      this.fechfin_libdiario = this.lib.fechfin_libdiario;
      this.nume_libdiario=this.lib.nume_libdiario;
    });
  }
  loadAsientos() {
    this.service.getAsientosId(this.id_libdiario).subscribe((data: any) => {
      this.AsientosList = data;
      this.id_libdiario = this.lib.id_libdiario;
      this.fech_asientos = this.lib.fech_asientos;
      this.obse_asientos = this.lib.obse_asientos;
    });
  }

  loadSubGrupocuentas() {
    this.service.getSubGrupoCuentas(this.id_libdiario).subscribe((data: any) => {
      this.SubGrupoCuentasList = data;
    });
  }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.service.getIdLibros().subscribe((data:any)=>{
      this.resp=data[0].id_libdiario;
      console.log("resp del Id");
      console.log(this.resp);
      if(this.resp==null){
        this.max=1;
      }
      else{
        this.max=this.resp+1;
      }

    this.nume_libdiario = this.max;
    });
    
  }

  addLibros() {
    var val = {
      id_libdiario: this.id_libdiario,
      fechini_libdiario:this.fechini_libdiario,
      fechfin_libdiario:this.fechfin_libdiario,
      nume_libdiario: this.nume_libdiario
    };
    this.service.addLibro(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateLibros() {
    var val = {
      id_libdiario: this.id_libdiario,
      fechini_libdiario:this.fechini_libdiario,
      fechfin_libdiario:this.fechfin_libdiario,
      nume_libdiario: this.nume_libdiario
    };
    this.service.updateLibro(val).subscribe(res => {
      alert(res.toString());
    });
  }

}
