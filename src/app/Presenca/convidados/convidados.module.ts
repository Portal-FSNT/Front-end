import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './../components/components.module';

import { EditarConvidadoComponent } from './editar-convidado/editar-convidado.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvidadosRoutingModule } from './convidados-routing.module';

import { ListaConvidadosComponent } from './lista-convidados/lista-convidados.component';
import { NovoConvidadoComponent } from './novo-convidado/novo-convidado.component';


//@NgModule({
 // declarations: [
 //   EditarConvidadoComponent, 
  //  ListaConvidadosComponent,
  //  NovoConvidadoComponent,


  //],
  imports: [
    CommonModule,
    ConvidadosRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
//})
export class ConvidadosModule { }
