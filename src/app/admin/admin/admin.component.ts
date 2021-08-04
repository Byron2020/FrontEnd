import { ToastrModule } from 'ngx-toastr';
import { ApiService } from './../../servicios/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userDetalles;
  nombUser:any;

  constructor(private router:Router, private service:ApiService) { }

  ngOnInit(): void {
  }  

 
}
