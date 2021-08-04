import { Component, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-search-lib',
  templateUrl: './search-lib.component.html',
  styleUrls: ['./search-lib.component.css']
})
export class SearchLibComponent implements OnInit {

  constructor(private service: ApiService) { }
   lib: any;

  id_libdiario: string;
  fechini_libdiario: string;
  fechfin_libdiario: string;

  id_asientos: string;
  fech_asientos: string;
  obse_asientos: string;

  id_transaccion: string;
  deta_transaccion: string;
  parc_transaccion: number;
  debe_transaccion: number;
  habe_transaccion: number;


  @Output() id_ast: any;

  @Output() ast: any = [];
  dato_search: string = "";
  dato_select: string = "";

  @Output() trans: any = [];
  @Output() debe: number;

  LibrosList: any = [];
  AsientosList: any = [];
  AdminAction: string;
  ModalTitle: string;
  ActivatedAddEditLibComp: boolean = false;
  ActivatedAddEditAstComp: boolean = false;

  ActivarbtnPDF: boolean = false;
  ActivarReporLib: boolean = false;

  totalDebe: number;
  totalHabe: number;

  prueba:number;
  Libros: any;

  ngOnInit(): void {


    this.refreshLibrosList();
    this.AdminAction = "Buscar datos";
  }
  getFor(item) {
    var tdebe = 0;
    var thabe = 0;

    for (let i = 0; i < item.length; i++) {
      tdebe=tdebe+item[i].debe_transaccion;
      thabe=thabe+item[i].habe_transaccion;
      console.log("valores del FOr");
      console.log(item[i].debe_transaccion);
    }
    this.totalDebe=tdebe;
    this.totalHabe=tdebe;
    this.prueba=tdebe;
    console.log(tdebe);
    /* var numbers = [2, 4, 6, 8];
    item.forEach(arrayFunction);

    function arrayFunction(element, index, array) {

      console.log("arr[" + index + "]=" + element.id_asientos);


    } */

  }
  addClick() {
    this.lib = {
      id_libdiario: 0,
      nume_libdiario: ""
    }
    this.ModalTitle = "Nuevos datos";
    this.ActivatedAddEditLibComp = true;
  }

  buscarClick(item) {
    this.service.searchLibro(this.dato_search).subscribe(data => {
      if (data == "Dato no encontrado" || this.dato_search == null) { this.LibrosList = " " }
      else { this.LibrosList = data; }
    });
  }
  buscarClick2(item) {
    this.ActivarbtnPDF=false;
    this.service.searchLibroMes(this.dato_select).subscribe(data => {
      if (data == "Dato no encontrado") { this.LibrosList = "Sin datos" }
      else { this.LibrosList = data; }
    });
  }
  addAasientoClick() {
    this.ast = {
      id_asientos: 0,
      obse_asientos: ""
    }
    this.ModalTitle = "Nuevos datos";
    this.ActivatedAddEditAstComp = true;
  }
  calcTotalLibDiario(item) {

    var totalHabe: number = 0;
    var totales: any = [];

    for (let i = 0; i < item.length; i++) {
      this.totalDebe = this.totalDebe + 1;
      totalHabe = totalHabe + i;
      console.log("detalle /TOTALES");
      console.log(this.totalDebe)
    }
    this.totalDebe = this.totalDebe;
    this.totalHabe = totalHabe;

  }
  detalleAsientosClick(item) {
  this.ActivarbtnPDF=true;
    this.ModalTitle = "Contenido datos";
    this.service.buscarAsientosId(item.id_libdiario).subscribe(data => {
      this.ast = data;
      this.id_ast = this.ast.id_asientos;
      this.Libros = item;
      this.getFor(this.ast);
    });
    
  }

  deleteLibDiarioClick(item) {
    if (confirm("Esta seguro?")) {
      this.service.deleteLibro(item.id_libdiario).subscribe(data => {
        alert(data.toString());
        this.buscarClick(item);
      });
    }
  }

  updateCuentas() {
    var val = {
      id_cuentas: this.id_libdiario,
      fechini_libdiario: this.fechini_libdiario,
      fechfin_libdiario: this.fechfin_libdiario
    };
    this.service.updateCuenta(val).subscribe(res => {
      alert(res.toString());
    });
  }

  closeClick() {
    this.ActivatedAddEditLibComp = false;
    this.refreshCuentasList();
    this.dato_search = null;
  }
  refreshLibrosList() {
    this.id_libdiario = this.lib.id_libdiario;
    this.fechini_libdiario = this.lib.id_libdiario;
    this.fechfin_libdiario = this.lib.id_libdiario;
  }
  refreshAsientosList() {
  this.id_asientos=this.ast.id_asientos;
  this.fech_asientos=this.ast.fech_asientos;
  this.obse_asientos=this.ast.obse_asientos;

  this.id_transaccion=this.ast.id_transaccion;
  this.deta_transaccion=this.ast.deta_transaccion;
  this.parc_transaccion=this.ast.parc_transaccion;
  this.debe_transaccion=this.ast.debe_transaccion;
  this.habe_transaccion=this.ast.habe_transaccion;
  }

  refreshCuentasList() {
    this.service.getCuentaList().subscribe(data => {
      this.LibrosList = data;
    });
  }

  refreshSearch() {
    this.service.searchCuenta(this.dato_search).subscribe(data => {
      if (data == "Dato no encontrado") { this.LibrosList = " " }
      else { this.LibrosList = data; }
    });
  }
}
