import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoasRoutingModule } from './pessoas-routing.module';
//import { ListaPessoasComponent } from './lista-pessoas/lista-pessoas.component';

//import { EditarPessoaComponent } from './editar-pessoa/editar-pessoa.component';
//import { NovaPessoaComponent } from './nova-pessoa/nova-pessoa.component';


//@NgModule({
  //declarations: [
  //  EditarPessoaComponent,

   // ListaPessoasComponent,
   // NovaPessoaComponent
  //],
  imports: [
    CommonModule,
    PessoasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
//})
export class PessoasModule { }
