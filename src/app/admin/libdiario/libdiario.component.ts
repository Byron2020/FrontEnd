import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { LibDiario } from 'src/app/modelos/lib-diario';


@Component({
  selector: 'app-libdiario',
  templateUrl: './libdiario.component.html',
  styleUrls: ['./libdiario.component.css']
})
export class LibdiarioComponent implements OnInit {

  Libros: LibDiario[];
  searchValue: any;
  p:number=1;

  constructor(private service: ApiService) { }

  ModalTitle:string;
  ActivatedAddEditLibComp:boolean=false;
  
  lib:any;
  ActivatedAsientos:boolean=false;

  AdminTitle: string;

  ngOnInit(): void {
    this.refreshLibrosList();
    //this.getLibrosAsientos();
    this.AdminTitle="Libro Diario";
  }

  getLibrosAsientos() {
    this.service.getLibDiario(this.lib.id_libdiario).subscribe((data: any) => {
      this.lib = data;
      
    });
    console.log("Valor del com ASientos");
      console.log(this.lib.id_libdiario);
  }

  getLibDiario(item){
    this.lib=item;
    console.log("get ibro Diario");
    console.log(this.lib);
    this.ActivatedAsientos=true;
  }
 

  key:string ='id';
  reverse:boolean=false;
  sort(key){
    this.key= key;
    this.reverse=!this.reverse;
  } 

 

  addLibClick(){
    this.lib={
      id_libdiario:0,
      nume_libdiario:""
    }
    console.log(this.lib);
    this.ModalTitle="Nuevos datos";
    this.ActivatedAddEditLibComp=true;
  }

  editClick(item){
    this.lib=item;
    this.ModalTitle="Editar datos";
    this.ActivatedAddEditLibComp=true;
  }

  deleteClick(item){
    if(confirm("Esta seguro?")){
      this.service.deleteCuenta(item.id_libdiario).subscribe(data=>{
        alert(data.toString());
        this.refreshLibrosList();
      });
    }
  }
  
  closeClick(){
    this.ActivatedAddEditLibComp=false;
    this.refreshLibrosList();
  }

  refreshLibrosList() {
    this.service.getLibroList().subscribe(data => {
      this.Libros = data;
    });
  }

 
}
