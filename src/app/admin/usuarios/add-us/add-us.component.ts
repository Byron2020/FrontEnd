import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-add-us',
  templateUrl: './add-us.component.html',
  styleUrls: ['./add-us.component.css']
})
export class AddUsComponent implements OnInit {

  constructor(private service: ApiService) { }

  lista: string[] = ["hola", "que", "tal", "estas"];

  ModalTitle: string;
  id_user: string;
  emai_user: string;
  pass_user: string;
  esta_user: string;
  nomb_user: string;

  estados: any = [];

  ngOnInit(): void {
    this.ModalTitle = "Nuevos Datos";
    this.estadosList();
  }

  addUser() {
    var val = {
      id_user: this.id_user,
      emai_user: this.emai_user,
      pass_user: this.pass_user,
      esta_user: this.esta_user,
      nomb_user: this.nomb_user
    };
    this.service.addUser(val).subscribe(res => {
      alert(res.toString());
      this.limpiarClick();
    });
  }

  limpiarClick() {
    this.id_user = " ",
      this.emai_user = " ",
      this.pass_user = " ",
      this.esta_user = " ",
      this.nomb_user = " "
  }

  estadosList() {
    this.service.getEstadosList().subscribe(data => {
      this.estados = data;
    });
  }
}
