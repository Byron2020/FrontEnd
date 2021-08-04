import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-add-edit-lib',
  templateUrl: './add-edit-lib.component.html',
  styleUrls: ['./add-edit-lib.component.css']
})
export class AddEditLibComponent implements OnInit {

  constructor(private service: ApiService) { }

  @Input() lib: any;
  id_libdiario: string;
  fechini_libdiario: string;
  fechfin_libdiario: string;
  nume_libdiario: string;

  id_asientos: string;
  fech_asientos: string;
  obse_asientos: string;

  id_transaccion: string;
  id_tipotransaccion: string;
  deta_transaccion: string;
  parc_transaccion: string;
  debe_transaccion: string;
  habe_transaccion: string;
  
  LibrosList: any = [];
  SubGrupoCuentasList: any = [];

  verGrupo: any;
  verSubGrupo: any;

  resp: any;
  max: any;

  ngOnInit(): void {
    this.loadLibros();
  }

  loadLibros() {
    this.service.getLibroList().subscribe((data: any) => {
      this.LibrosList = data;
      this.id_libdiario = this.lib.id_libdiario;
      this.fechini_libdiario = this.lib.fechini_libdiario;
      this.fechfin_libdiario = this.lib.fechfin_libdiario;
      this.nume_libdiario = this.lib.nume_libdiario;
    });
  }

  loadSubGrupocuentas() {
    this.service.getSubGrupoCuentas(this.id_libdiario).subscribe((data: any) => {
      this.SubGrupoCuentasList = data;
    });
  }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.service.getIdLibros().subscribe((data: any) => {
      this.resp = data[0].id_libdiario;
      console.log("resp del Id");
      console.log(this.resp);
      if (this.resp == null) {
        this.max = 1;
      }
      else {
        this.max = this.resp + 1;
      }

      this.nume_libdiario = this.max;
    });

  }

  addLibros() {
    var val = {
      id_libdiario: this.id_libdiario,
      fechini_libdiario: this.fechini_libdiario,
      fechfin_libdiario: this.fechfin_libdiario,
      nume_libdiario: this.nume_libdiario
    };
    this.service.addLibro(val).subscribe(res => {
      alert(res.toString());
      this.limpiar();
    });
  }

  updateLibros() {
    var val = {
      id_libdiario: this.id_libdiario,
      fechini_libdiario: this.fechini_libdiario,
      fechfin_libdiario: this.fechfin_libdiario,
      nume_libdiario: this.nume_libdiario
    };
    this.service.updateLibro(val).subscribe(res => {
      alert(res.toString());
    });
  }

  limpiar() {
    this.fechini_libdiario ="";
    this.fechfin_libdiario ="";
    this.nume_libdiario ="";
  }
}
