import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-add-edit-us',
  templateUrl: './add-edit-us.component.html',
  styleUrls: ['./add-edit-us.component.css']
})
export class AddEditUsComponent implements OnInit {

  constructor(private service: ApiService) { }

  @Input() user: any;

  ModalTitle: string;

  id_user: string;
  emai_user: string;
  pass_user: string;
  esta_user: string;
  nomb_user: string;

  userList: any = [];
  estados: any=[];
  currentUser:string;
  
  ngOnInit(): void {
    this.loadUser();
    this.ModalTitle = "Editar Datos";
    this.estadosList();
  }

  loadUser() {
    this.service.getUserList().subscribe((data: any) => {
      this.userList = data;
      this.id_user = this.user.id_user;
      this.emai_user = this.user.emai_user;
      this.pass_user = this.user.pass_user;
      this.esta_user = this.user.esta_user;
      this.nomb_user = this.user.nomb_user;
    });
  }


  updateUser() {
    var val = {
      id_user: this.id_user,
      emai_user: this.emai_user,
      pass_user: this.pass_user,
      esta_user: this.esta_user,
      nomb_user: this.nomb_user
    };
    this.service.updateUser(val).subscribe(res => {
      alert(res.toString());
      this.refreshPerfil();
    });
  }
  refreshPerfil() {
    var user = localStorage.getItem('user');
    this.currentUser=user;
  }

  estadosList() {
    this.service.getEstadosList().subscribe(data => {
      this.estados = data;
    });
  }
}
