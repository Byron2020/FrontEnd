import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/servicios/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  nomUser:any;
  isLogged:boolean=false;
  constructor(private authService: ApiService, private router: Router, private toastr: ToastrService) { }
  formModel={
    emai_user: '',
    pass_user:''
  }

  currentUser:string="N User"

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.authService.login(f.value).subscribe(
      (res:any)=>{
        localStorage.setItem('token',res.token);
        localStorage.setItem('user',res.table[0].nomb_user);
        localStorage.setItem('id',res.table[0].id_user);
        this.router.navigateByUrl('/');
        location.reload();
      },
      err=>{
        if(err.status==400){
          this.toastr.error('Datos no coinciden','ERROR');          
        }
      
      }
    );
    this.refreshPerfil();
  }

  refreshPerfil() {
    var user = localStorage.getItem('user');
    this.nomUser=user;
    
  }

  onCheckUser(): void{
    if(this.authService.getCurrentUser()==null){
      this.isLogged=false;
    }else{
      this.isLogged=true;
      /* this.currentUser=this.authService.getCurrentUser(); */
    }
  }

}
