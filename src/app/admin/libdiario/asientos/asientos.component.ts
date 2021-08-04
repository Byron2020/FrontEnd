import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { LibDiario } from 'src/app/modelos/lib-diario';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.css']
})
export class AsientosComponent implements OnInit {

  @Input() ast:any;

  id_libdiario: number;
  fechini_libdiario:string;
  fechfin_libdiario:string;
  nume_libdiario:string;
  
  id:string;
  f1:string;
  f2:string;

  AsientosList: any = [];
  TransaccionesList: any = [];
  AdminTitle:string;
  ModalTitle:string;
  p=1;

  ActivatedAddEditAstComp:boolean= false;
  ActivarTabla:boolean=false;

  constructor(private service: ApiService, private rutaActiva: ActivatedRoute) { }

   ngOnInit(): void {
    this.getAsientosList();
    this.AdminTitle="Asientos";
   
  }

  addAstClick(){
    this.ast={
      id_asientos:0
    }
    this.ModalTitle="Nuevo Asiento";
    this.ActivatedAddEditAstComp=true;
  }


  getAsientosList() {

    this.id=this.rutaActiva.snapshot.params.id;
    this.f1=this.rutaActiva.snapshot.params.f1;
    this.f2=this.rutaActiva.snapshot.params.f2;

    this.service.getAsientosId(this.id).subscribe((data: any) => {
      this.ast = data;
      this.id_libdiario = this.ast.id_cuentas;
      this.fechini_libdiario = this.ast.fechini_libdiario;
      this.fechfin_libdiario = this.ast.fechfin_libdiario;
      this.nume_libdiario = this.ast.nume_libdiario;
    });

  }

  detalleTransaccionesClick(item) {
    this.ActivarTabla=true;
    console.log("REp Asientos/ detalle/ item.id_lib");
    console.log(item.id_asientos);
    this.service.getTransaccionesByAst(item.id_asientos).subscribe(data => {
      this.TransaccionesList = data;
      console.log("detalle Transacciones");
      console.log(this.TransaccionesList);
    });
  }
   //-----------------------------------------------
  
  closeClick() {
    this.ActivatedAddEditAstComp = false;
    this.refreshAstList();
  }
  refreshAstList() {
    this.id=this.rutaActiva.snapshot.params.id;
    this.service.getAsientosId(this.id).subscribe(data => {
      this.ast = data;
      console.log("REfres aSientos Array");
      console.log(this.ast);
    });
  }

}


