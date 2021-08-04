import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-show-us',
  templateUrl: './show-us.component.html',
  styleUrls: ['./show-us.component.css']
})
export class ShowUsComponent implements OnInit {

  constructor(private service: ApiService) { }

  ActivatedAddEditUserComp:boolean=false;
  userList:any=[];
  ModalTitle:string;
  p:number=1;
  
  user:any;

  ngOnInit(): void {
    this.refreshUserList();
  }

  addLibClick(){
    this.user={
      id_libdiario:0,
      nume_libdiario:""
    }
    console.log(this.user);
    this.ModalTitle="Nuevos datos";
    this.ActivatedAddEditUserComp=true;
  }

  editUserClick(item){
    this.user=item;
    this.ModalTitle="Editar datos";
    this.ActivatedAddEditUserComp=true;
  }

  deleteClick(item){
    if(confirm("Esta seguro?")){
      this.service.deleteUser(item.id_user).subscribe(data=>{
        alert(data.toString());
        this.refreshUserList();
      });
    }
  }
  
  closeClick(){
    this.ActivatedAddEditUserComp=false;
    this.refreshUserList();
  }

  refreshUserList() {
    this.service.getUserList().subscribe(data => {
      this.userList= data;
    });
  }
}
