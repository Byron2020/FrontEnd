import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-add-edit-ast',
  templateUrl: './add-edit-ast.component.html',
  styleUrls: ['./add-edit-ast.component.css']
})
export class AddEditAstComponent implements OnInit {

  constructor(private service:ApiService) { }
  @Input() ast:any=[];

  AsientosList:any=[];
  
  id_libdiario:string;
  id_asientos:string;
  fech_asientos:string;
  deta_asientos:string;
  obse_asientos:string;

  currentUser:string;

  ngOnInit(): void {
    this.loadAsientos();
  }
  loadAsientos() {
    this.service.getAsientosId(this.ast[0].id_libdiario).subscribe((data: any) => {
      this.AsientosList = data;
      this.id_asientos = this.ast.id_asientos;
      this.fech_asientos=this.ast.fech_asientos;
      this.deta_asientos=this.ast.deta_asientos;
      this.obse_asientos=this.ast.obse_asientos;

    });
  }

  updateSocio() {
    var val = {
      id_asientos:this.ast.id_asientos,
      fech_asientos:this.ast.fech_asientos,
      deta_asientos:this.ast.deta_asientos,
      obse_asientos:this.ast.obse_asientos
    };
    this.service.updateSocios(val).subscribe(res => {
      alert(res.toString());
      this.refreshPerfil();
    });
  }
 
  refreshPerfil() {
    var user = localStorage.getItem('user');
    this.currentUser = user;
  }


}
