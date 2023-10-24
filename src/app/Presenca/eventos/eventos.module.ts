import { ComponentsModule } from './../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';



  imports: [
    CommonModule,
    FormsModule,
    EventosRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  
  
   
   
  ]

export class EventosModule { }
