import { ShowCtComponent } from './admin/cuentas/show-ct/show-ct.component';
import { SearchComponent } from './admin/cuentas/search/search.component';
import { LogginComponent } from './user/loggin/loggin.component';
import { CuentasComponent } from './admin/cuentas/cuentas.component';
import { LibdiarioComponent } from './admin/libdiario/libdiario.component';
import { AdminComponent } from './admin/admin/admin.component';
import { HomeComponent } from './layouts/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AsientosComponent } from './admin/libdiario/asientos/asientos.component';
import { AddCtComponent } from './admin/cuentas/add-ct/add-ct.component';
import { DetalleLibComponent } from './admin/libdiario/detalle-lib/detalle-lib.component';
import { SearchLibComponent } from './admin/libdiario/search-lib/search-lib.component';
import { ShowLibComponent } from './admin/libdiario/show-lib/show-lib.component';
import { AddAsComponent } from './admin/libdiario/add-as/add-as.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { ShowUsComponent } from './admin/usuarios/show-us/show-us.component';
import { AddEditLibComponent } from './admin/libdiario/add-edit-lib/add-edit-lib.component';
import { AddEditUsComponent } from './admin/usuarios/add-edit-us/add-edit-us.component';
import { AddUsComponent } from './admin/usuarios/add-us/add-us.component';
import { SociosComponent } from './admin/socios/socios.component';
import { ShowScComponent } from './admin/socios/show-sc/show-sc.component';
import { AddScComponent } from './admin/socios/add-sc/add-sc.component';
import { AddEditScComponent } from './admin/socios/add-edit-sc/add-edit-sc.component';
import { SearchScComponent } from './admin/socios/search-sc/search-sc.component';
import { ResetPassComponent } from './user/reset-pass/reset-pass.component';
import { PerfilUsComponent } from './admin/usuarios/perfil-us/perfil-us.component';
import { IngresosyegresosComponent } from './admin/ingresosyegresos/ingresosyegresos.component';
import { ShowIeComponent } from './admin/ingresosyegresos/show-ie/show-ie.component';
import { AddIeComponent } from './admin/ingresosyegresos/add-ie/add-ie.component';
import { AddEditIeComponent } from './admin/ingresosyegresos/add-edit-ie/add-edit-ie.component';
import { SearchIeComponent } from './admin/ingresosyegresos/search-ie/search-ie.component';
import { ReportesComponent } from './admin/reportes/reportes.component';
import { ShowLibdiarioComponent } from './admin/reportes/show-libdiario/show-libdiario.component';
import { AddEditAstComponent } from './admin/libdiario/add-edit-ast/add-edit-ast.component';
import { ShowRepLibdiarioComponent } from './admin/reportes/show-rep-libdiario/show-rep-libdiario.component';
import { ShowSociosComponent } from './admin/reportes/show-socios/show-socios.component';


const routes: Routes = [
  { path: 'user/loggin', component: LogginComponent },
  { path: 'reset-pass', component: ResetPassComponent },
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'usuarios/perfil-us', component: PerfilUsComponent },
  {
    path: 'admin/libdiario/id/detalle-lib/:id/:fi/:ff', component: DetalleLibComponent
  },
  {
    path: 'admin/libdiario/id/asientos/:id/:fi/:ff',
    component: AsientosComponent
  },
  {
    path: 'admin/users', component: UsuariosComponent,
    children: [
      {
        path: 'show-us',
        component: ShowUsComponent
      },
      {
        path: 'add-us',
        component: AddUsComponent
      },
      {
        path: 'add-edit-us',
        component: AddEditUsComponent
      }
    ]
  },
  {
    path: 'admin/ingresosyegresos', component: IngresosyegresosComponent,
    children: [
      {
        path: 'show-ie',
        component: ShowIeComponent
      },
      {
        path: 'add-ie',
        component: AddIeComponent
      },
      {
        path: 'add-edit-ie',
        component: AddEditIeComponent
      },
      {
        path: 'search-ie',
        component: SearchIeComponent
      }
    ]
  },
  {
    path: 'admin/reportes', component: ReportesComponent,
    children: [
      {
        path: 'show-libdiario',
        component: ShowLibdiarioComponent
      },
      {
        path: 'show-rep-libdiario',
        component: ShowRepLibdiarioComponent
      },
      {
        path: 'show-socios',
        component: ShowSociosComponent
      }
    ]
  },
  {
    path: 'admin/socios', component: SociosComponent,
    children: [
      {
        path: 'show-sc',
        component: ShowScComponent
      },
      {
        path: 'add-sc',
        component: AddScComponent
      },
      {
        path: 'add-edit-sc',
        component: AddEditScComponent
      },
      {
        path: 'search-sc',
        component: SearchScComponent
      }
    ]
  },
  {
    path: 'admin/cuentas', component: CuentasComponent,
    children: [
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'show-ct',
        component: ShowCtComponent
      },
      {
        path: 'add-ct',
        component: AddCtComponent
      }
    ]
  },

  {
    path: 'admin/libdiario', component: LibdiarioComponent,
    children: [
      {
        path: 'show-lib',
        component: ShowLibComponent
      },
      {
        path: 'search-lib',
        component: SearchLibComponent
      },
      {
        path: 'add-as',
        component: AddAsComponent
      },
      {
        path: 'add-edit-lib',
        component: AddEditLibComponent
      },
      {
        path: 'add-edit-ast',
        component: AddEditAstComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
