import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



//======= IMPORTS DO PORTAL ==============
import { LoginComponent } from './Portal/login/login.component';
import { RegisterComponent } from './Portal/register/register.component';
import { HomeComponent } from './Portal/home/home.component';
import { TypeRegisterComponent } from './Portal/type-register/type-register.component';
import { UsersComponent } from './Portal/Usuários/users/users.component';
import { UsersPendingComponent } from './Portal/Usuários/users-pending/users-pending.component';
import { NewAdmComponent } from './Portal/Usuários/new-adm/new-adm.component';



//======= IMPORTS DE ESPAÇOS ==============
import { SolicitarComponent } from './Espaços/Solicitantes/solicitar/solicitar.component';
import { VisualizarComponent } from './Espaços/Solicitantes/visualizar/visualizar.component';
import { SolicitacoesComponent } from './Espaços/Adiministrador/solicitacoes/solicitacoes.component';
import { SolicitacoesConfirmadasComponent } from './Espaços/Adiministrador/solicitacoes-confirmadas/solicitacoes-confirmadas.component';
import { EspacosComponent } from './Espaços/Adiministrador/espacos/espacos.component';
import { EspacosNovoComponent } from './Espaços/Adiministrador/espacos-novo/espacos-novo.component';




// ====== IMPORTS DE EVENTOS ===================

import { CadEventosComponent } from './Eventos/cad-eventos/cad-eventos.component';
import { HomeEventosComponent } from './Eventos/home-eventos/home-eventos.component';
import { AlterarEventoComponent } from './Eventos/alterar-evento/alterar-evento.component';




// ====== IMPORTS DE EVENTOS ===================

import { ListaEventosComponent } from './Presenca/eventos/lista-eventos/lista-eventos.component';
import { ListaPessoasComponent } from './Presenca/pessoas/lista-pessoas/lista-pessoas.component';
import { ListaEmpresasComponent } from './Presenca/empresas/lista-empresas/lista-empresas.component';
import { ListaConvidadosComponent } from './Presenca/convidados/lista-convidados/lista-convidados.component';
import { NovoEventoComponent } from './Presenca/eventos/novo-evento/novo-evento.component';
import { UserAdm } from '../guard/user-guard.guard';
import { RoleGuard } from '../guard/role.guard';
 



const routes: Routes = [
  // -----ROTAS DO PORTAL --------
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'type-register', component: TypeRegisterComponent },


  {
    path: 'home', component: HomeComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador']
    }
  },

  {
    path: 'users', component: UsersComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador']
    }
  },

  {
    path: 'users-pending', component: UsersPendingComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador']
    }
  },
  {
    path: 'register-adm', component: NewAdmComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador']
    }
  },



  // -----ROTAS DO EVENTOS --------

  {
    path: 'eventos', component: HomeEventosComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador']
    }
  },
  {
    path: 'cad-eventos', component: CadEventosComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador']
    }
  },

  // ROTAS DO SISTEMA DE ESPAÇOS
  {
    path: 'solicitar', component: SolicitarComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador', 'Solicitante']
    }
  },
  {
    path: 'visualizar', component: VisualizarComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador', 'Solicitante']
    }
  },
  {
    path: 'solicitacoes', component: SolicitacoesComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador']
    }
  },
  {
    path: 'espacos', component: EspacosComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador']
    }
  },
  {
    path: 'espacos-novo', component: EspacosNovoComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador']
    }
  },
  {
    path: 'solicitacoes-confirmadas', component: SolicitacoesConfirmadasComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador']
    }
  },
  {
    path: 'alterar-evento/:id', component: AlterarEventoComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador']
    }
  },
  {
    path: 'lista-eventos', component: ListaEventosComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador']
    }
  },
  {
    path: 'lista-pessoas', component: ListaPessoasComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador']
    }
  },
  {
    path: 'lista-empresas', component: ListaEmpresasComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador']
    }
  },
  {
    path: 'lista-convidados/:id', component: ListaConvidadosComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador']
    }
  },
  {
    path: 'novo-evento', component: NovoEventoComponent, canActivate: [UserAdm, RoleGuard],
    data: {
      expectedRole: ['Administrador']
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
