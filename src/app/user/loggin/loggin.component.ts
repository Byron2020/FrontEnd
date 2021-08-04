import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent implements OnInit {
  
  form2: FormGroup;
  nomUser:any;
  isLogged:boolean=false;
  constructor(private authService: ApiService, private router: Router, private toastr: ToastrService, public fb: FormBuilder) { 
    this.form2 = this.fb.group({
      age: [0, Validators.min(18)],
      price: [0, Validators.max(3000)],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      terms: ['', Validators.requiredTrue],
      email: ['', [Validators.required, Validators.email]],
      text: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', Validators.required],
      category: ['', Validators.required],
      gender: ['', Validators.required],
    });
  
  }
  formModel={
    emai_user: '',
    pass_user:''
  }
 
  currentUser:string="N User"

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/');
    }
    this.onCheckUser();

  }

  saveData(){
    console.log(this.form2.value);
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
