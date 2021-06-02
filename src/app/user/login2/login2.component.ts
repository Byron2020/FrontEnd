import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ApiService } from './../../servicios/api.service';
import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {

  formModel={
    emai_user: '',
    pass_user:''
  }
  constructor(private authService: ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit(f: NgForm) {
    this.authService.login(f.value).subscribe(
      (res:any)=>{
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/admin');
      },
      err=>{
        if(err.status==400){
          this.toastr.error('Datos no coinciden','ERROR');
          console.log(err);
        }
        else{
          console.log(err);
        }
      }
    );
    /* const loginObserver={
      next: x=> console.log('Usuario logeado'+x),
      error: err=>console.log(err)
    }; */
    //this.authService.login(f.value).subscribe(loginObserver);

    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }
  
}
