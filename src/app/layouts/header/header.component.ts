import { ApiService } from './../../servicios/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: ApiService, private router: Router) { }
  public isLogged: boolean=false;
  ngOnInit(): void {
    this.onCheckUser();
  }

  onCheckUser(): void{
    if(this.authService.getCurrentUser()==null){
      this.isLogged=false;
    }else{
      this.isLogged=true;
    }
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login2']);
  }
}
