import { ApiService } from './servicios/api.service';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

// If any issue using previous fonts import. you can try this:
// import pdfFonts from "pdfmake/build/vfs_fonts";

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './layouts/home/home.component';
import  { ToastrModule  }  from  'ngx-toastr';
import { AdminComponent } from './admin/admin/admin.component';
import { LibdiarioComponent } from './admin/libdiario/libdiario.component';
import { CuentasComponent } from './admin/cuentas/cuentas.component';
import { ShowCtComponent } from './admin/cuentas/show-ct/show-ct.component';
import { AddEditCtComponent } from './admin/cuentas/add-edit-ct/add-edit-ct.component';
import { LogginComponent } from './user/loggin/loggin.component';
import { SearchComponent } from './admin/cuentas/search/search.component' ;
import { NgxPaginationModule } from 'ngx-pagination';
import { AddEditLibComponent } from './admin/libdiario/add-edit-lib/add-edit-lib.component';
import { AsientosComponent } from './admin/libdiario/asientos/asientos.component';
import { AddCtComponent } from './admin/cuentas/add-ct/add-ct.component';
import { DetalleLibComponent } from './admin/libdiario/detalle-lib/detalle-lib.component';
import { SearchLibComponent } from './admin/libdiario/search-lib/search-lib.component';
import { ShowLibComponent } from './admin/libdiario/show-lib/show-lib.component';
import { AddAsComponent } from './admin/libdiario/add-as/add-as.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { AddEditUsComponent } from './admin/usuarios/add-edit-us/add-edit-us.component';
import { ShowUsComponent } from './admin/usuarios/show-us/show-us.component';
import { AddUsComponent } from './admin/usuarios/add-us/add-us.component';
import { SociosComponent } from './admin/socios/socios.component';
import { AddScComponent } from './admin/socios/add-sc/add-sc.component';
import { AddEditScComponent } from './admin/socios/add-edit-sc/add-edit-sc.component';
import { SearchScComponent } from './admin/socios/search-sc/search-sc.component';
import { ShowScComponent } from './admin/socios/show-sc/show-sc.component';
import { ResetPassComponent } from './user/reset-pass/reset-pass.component';
import { PerfilUsComponent } from './admin/usuarios/perfil-us/perfil-us.component';
import { IngresosyegresosComponent } from './admin/ingresosyegresos/ingresosyegresos.component';
import { ShowIeComponent } from './admin/ingresosyegresos/show-ie/show-ie.component';
import { AddIeComponent } from './admin/ingresosyegresos/add-ie/add-ie.component';
import { AddEditIeComponent } from './admin/ingresosyegresos/add-edit-ie/add-edit-ie.component';
import { SearchIeComponent } from './admin/ingresosyegresos/search-ie/search-ie.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { ReportesComponent } from './admin/reportes/reportes.component';
import { ShowLibdiarioComponent } from './admin/reportes/show-libdiario/show-libdiario.component';
import { AddEditAstComponent } from './admin/libdiario/add-edit-ast/add-edit-ast.component';
import { ShowRepLibdiarioComponent } from './admin/reportes/show-rep-libdiario/show-rep-libdiario.component';
import { ShowSociosComponent } from './admin/reportes/show-socios/show-socios.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    LibdiarioComponent,
    CuentasComponent,
    ShowCtComponent,
    AddEditCtComponent,
    LogginComponent,
    SearchComponent,
    AddEditLibComponent,
    AsientosComponent,
    AddCtComponent,
    DetalleLibComponent,
    SearchLibComponent,
    ShowLibComponent,
    AddAsComponent,
    UsuariosComponent,
    AddEditUsComponent,
    ShowUsComponent,
    AddUsComponent,
    SociosComponent,
    AddScComponent,
    AddEditScComponent,
    SearchScComponent,
    ShowScComponent,
    ResetPassComponent,
    PerfilUsComponent,
    IngresosyegresosComponent,
    ShowIeComponent,
    AddIeComponent,
    AddEditIeComponent,
    SearchIeComponent,
    ScrollToTopComponent,
    ReportesComponent,
    ShowLibdiarioComponent,
    AddEditAstComponent,
    ShowRepLibdiarioComponent,
    ShowSociosComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      progressBar:true
    })
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})

export class AppModule { }
