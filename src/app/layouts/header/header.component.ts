import { ApiService } from './../../servicios/api.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()name:string;
  
  constructor(private location:Location, private authService: ApiService, private router: Router) {
   }
  @Input()nombUser:string="-----"
  userDetalles:any="User";
  currentUser:any=["User"];
  public isLogged: boolean=false;

  ngOnInit(): void {
    this.onCheckUser();
  }
  
  refreshPerfil() {
    var user = localStorage.getItem('user');
    this.currentUser=user;
  }

  refreshUrl() {
    var url='admin';
    this.router.navigate(["admin"]);
    location.reload();
  }
  
  onCheckUser(): void{
    if(this.authService.getCurrentUser()==null){
      this.isLogged=false;
      this.refreshPerfil();
      /* location.reload(); */
    }else{
      this.isLogged=true;
      this.refreshPerfil();
     
      /* this.currentUser=this.authService.getCurrentUser(); */
    }
  }

  onLogout(){
    this.authService.logoutUser();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
    this.refreshPerfil();
    location.replace('/');
  }
}
