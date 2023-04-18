import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GraficoComponent } from './grafico/grafico.component';
import { ExtratoComponent } from './extrato/extrato.component';
import { ConveniosComponent } from './convenios/convenios.component';
import { GastosSaudeComponent } from './gastos-saude/gastos-saude.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth/auth-guard.service';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  {path: "", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "grafico", component: GraficoComponent, canActivate: [AuthGuard]},
  {path: "extrato", component: ExtratoComponent, canActivate: [AuthGuard]},
  {path: "convenios", component: ConveniosComponent, canActivate: [AuthGuard]},
  {path: "irpf", component: GastosSaudeComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent},
  {path: "change-password", component: ChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
