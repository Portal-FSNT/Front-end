//import { AutenticacaoModule } from './../autenticacao/autenticacao.module';
//import { AppRoutingModule } from './../app-routing.module';
import { NavbarAdmComponent } from './navbar/navbar-adm/navbar-adm.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';



@NgModule({
  declarations: [NavbarAdmComponent, CabecalhoComponent],
  imports: [
    CommonModule,
   
    
  ],
  exports:[NavbarAdmComponent,CabecalhoComponent],
  entryComponents:[NavbarAdmComponent]
})
export class ComponentsModule {
  
 }
