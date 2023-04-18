import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { BarraLateralComponent } from './barra-lateral/barra-lateral.component';
import { RodapeComponent } from './rodape/rodape.component';
import { GraficoComponent } from './grafico/grafico.component';
import { ExtratoComponent } from './extrato/extrato.component';
import { GastosSaudeComponent } from './gastos-saude/gastos-saude.component';
import { ConveniosComponent } from './convenios/convenios.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login/login.service';
import { UtilService } from './services/util/util.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth/auth-guard.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CabecalhoComponent,
    BarraLateralComponent,
    RodapeComponent,
    GraficoComponent,
    ExtratoComponent,
    GastosSaudeComponent,
    ConveniosComponent,
    LoginComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
