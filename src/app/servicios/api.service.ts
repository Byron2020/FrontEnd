
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = "http://localhost:50274/api/";

  public currentUser: string;
  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json"
  });


  logoutUser(){
    console.log("slair de la appa");
  }
  login(formData) {
    return this.http.post(this.url + 'Login/prueba/', formData);
  }

  /* 
    getPerfil(){
      var user=localStorage.getItem('user');
      return this.http.get(this.url+'user/perfil?id='+user);
    }
   */

  getCurrentUser() {
    let user_string = localStorage.getItem("user");
    if (user_string!=null) {
      return user_string;
    } else {
      return null;
    }
  }
  /////////////// CUENTAS //////////////////////////// LibDiario/GetIdLibro/
  getCuentaList(): Observable<any[]> {
    return this.http.get<any>(this.url + '/cuentas');
  }

  addCuenta(val: any) {
    return this.http.post(this.url + '/cuentas', val);
  }

  updateCuenta(val: any) {
    return this.http.put(this.url + 'cuentas', val);
  }

  deleteCuenta(val: any) {
    return this.http.delete(this.url + 'cuentas/' + val);
  }
  searchCuenta(val: any) {
    return this.http.get<any>(this.url + 'cuentas/buscar?dato=' + val);
  }
  getAllGrupoCuentas(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'cuentas/GetAllGrupoCuentas');
  }
  getSubGrupoCuentas(val: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'cuentas/GetSubGrupoCuentas?dato=' + val);
  }
  getIdCuentas(val: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'cuentas/GetIdCuentas?dato=' + val);
  }
  /////////////// LIBRO DIARIO //////////////////////////// LibDiario/GetIdLibro/
  getLibroList(): Observable<any[]> {
    return this.http.get<any>(this.url + 'libdiario');
  }
  addLibro(val: any) {
    return this.http.post(this.url + 'libdiario', val);
  }

  updateLibro(val: any) {
    return this.http.put(this.url + 'libdiario', val);
  }

  deleteLibro(val: any) {
    return this.http.delete(this.url + 'libdiario/' + val);
  }
  getIdLibros(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'LibDiario/GetIdLibro');
  }
  getLibDiario(val: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'LibDiario/getLibroDiario?dato=' + val);
  }
  searchLibro(val: any) {
    return this.http.get<any>(this.url + 'LibDiario/buscar?dato=' + val);
  }
  searchLibroMes(val: any) {
    return this.http.get<any>(this.url + 'LibDiario/buscarmes?dato=' + val);
  }

  /////////////// REPORTES ////////////////////////////
  searchReportesLib(f1,f2) {
    return this.http.get<any>(this.url + 'LibDiario/reportesLib?f1=' + f1+'&f2='+f2);
  }


  /////////////// ASIENTOS ////////////////////////////
  getAsientosId(val): Observable<any[]> {
    return this.http.get<any>(this.url + 'asientos/'+val);
  }
  buscarAsientosId(val: any) {
    return this.http.get<any>(this.url + 'asientos/buscar?dato=' + val);
  }
  deleteAsiento(val: any) {
    return this.http.delete(this.url + 'asiento/' + val);
  }

  //////////////// TRANSACCIONES //////////////////////////////

  //transacciones/GetIdTransaccion?dato=2
  getTransaccionesByAst(val:any): Observable<any[]> {
    return this.http.get<any>(this.url + 'transacciones/'+val);
  }

  getTransaccionesId(val:any): Observable<any[]> {
    return this.http.get<any>(this.url + 'transacciones/'+val);
  }
  deleteTransacciones(val: any) {
    return this.http.delete(this.url + 'transacciones/' + val);
  }
  /////////////// USUARIOS ////////////////////////////
  
  getEstadosList(): Observable<any[]> {
    return this.http.get<any>(this.url + 'estados');
  }

  getUserList(): Observable<any[]> {
    return this.http.get<any>(this.url + 'user');
  }

  addUser(val: any) {
    return this.http.post(this.url + 'user', val);
  }

  updateUser(val: any) {
    return this.http.put(this.url + 'user', val);
  }

  deleteUser(val: any) {
    return this.http.delete(this.url + 'user/' + val);
  }
  getPerfilUser(val: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'user/perfil?dato=' + val);
  }
  /////////////// SOCIOS ////////////////////////////
  
  searchSocios(val: any) {
    return this.http.get<any>(this.url + 'socios/buscar?dato=' + val);
  }

  getTipoSociosList(): Observable<any[]> {
    return this.http.get<any>(this.url + 'tiposocios');
  }

  getSociosList(val: any): Observable<any[]> {
    return this.http.get<any>(this.url + 'socios/getEstado?dato='+val);
  }

  addSocios(val: any) {
    return this.http.post(this.url + 'socios', val);
  }

  updateSocios(val: any) {
    return this.http.put(this.url + 'socios', val);
  }

  deleteSocios(val: any) {
    return this.http.delete(this.url + 'socios/' + val);
  }

}
