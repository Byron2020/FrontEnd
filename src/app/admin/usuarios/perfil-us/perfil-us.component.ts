import { Component, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-us',
  templateUrl: './perfil-us.component.html',
  styleUrls: ['./perfil-us.component.css']
})
export class PerfilUsComponent implements OnInit {

  constructor(private service: ApiService, private router:Router) { }

  @Input()us: any;

  ModalTitle: string;

  id_user: string;
  emai_user: string;
  pass_user: string;
  esta_user: string;
  nomb_user: string;
  id_estado:String;

  userList: any=[];
  estados: any=[];
  
  ngOnInit(): void {
    this.loadUser();
    this.refreshUsList();
    this.ModalTitle = "Perfil de Usuario";
    this.estadosList();
  }

  refreshUsList() {
    var userId = localStorage.getItem('id');
    this.service.getPerfilUser(userId).subscribe(data => {
      this.us = data;
    });
  }

  loadUser() {
    var userId = localStorage.getItem('id');
    this.service.getPerfilUser(userId).subscribe(data => {
      this.us= data;
      this.id_user = this.us[0].id_user;
      this.emai_user = this.us[0].emai_user;
      this.pass_user = this.us[0].pass_user;
      this.esta_user = this.us[0].esta_user;
      this.nomb_user = this.us[0].nomb_user;
    });
  }


  updateUser() {
    var val = {
      id_user: this.id_user,
      emai_user: this.emai_user,
      pass_user: this.pass_user,
      nomb_user: this.nomb_user,
      esta_user: this.esta_user
    };
    console.log("del update");
    console.log(val);
    this.service.updateUser(val).subscribe(res => {
      alert(res.toString());
    });
  }

  estadosList() {
    this.service.getEstadosList().subscribe(data => {
      this.estados = data;
    });
  }
  cancelPerfil(){
    this.router.navigateByUrl('/');
  }
}
