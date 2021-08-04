import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-show-sc',
  templateUrl: './show-sc.component.html',
  styleUrls: ['./show-sc.component.css']
})
export class ShowScComponent implements OnInit {
  constructor(private service: ApiService) { }

  SociosList:any=[];
  ModalTitle:string;
  ActivatedAddEditSociosComp:boolean=false;
  sc:any;
  p:number=1;

  ngOnInit(): void {
    this.refreshSociosList();
  }

  editClick(item){
    this.sc=item;
    this.ModalTitle="Editar datos";
    this.ActivatedAddEditSociosComp=true;
  }

  deleteClick(item){
    if(confirm("Esta seguro?")){
      this.service.deleteSocios(item.id_socio).subscribe(data=>{
        alert(data.toString());
        this.refreshSociosList();
      });
    }
  }
  
  closeClick(){
    this.ActivatedAddEditSociosComp=false;
    this.refreshSociosList();
  }

  refreshSociosList() {
    this.service.getSociosList(1).subscribe(data => {
      this.SociosList = data;
    });
  }
}
