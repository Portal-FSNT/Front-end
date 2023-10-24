import { ListaConvidadosComponent } from './lista-convidados/lista-convidados.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
  path:'',
  component:ListaConvidadosComponent
 } ,{
   path:':id_evento',
    component:ListaConvidadosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvidadosRoutingModule { }
