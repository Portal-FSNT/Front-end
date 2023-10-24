import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalAcceptDenyUserComponent } from '../../Modal/modal-accept-deny-user/modal-accept-deny-user.component';
import { UsersPending } from './users-pending';
import { UsersPendingService } from './users-pending.service';

@Component({
  selector: 'app-users-pending',
  templateUrl: './users-pending.component.html',
  styleUrls: ['./users-pending.component.scss', '../../../../styles.scss']
})
export class UsersPendingComponent implements OnInit {
  @Input() user: any;

  table: UsersPending[] = [];
  filteredTable: UsersPending[] = [];
  adm: string = 'Administrador';
  soli: string = 'Solicitante';

  constructor(private service: UsersPendingService, private modalService: BsModalService) { }

  ngOnInit() {
    this.service.listUsersPending().subscribe((event) => {
      this.table = event.result as UsersPending[];
      this.filterTable();
      console.log(this.filteredTable);
    });
  }

  filterTable() {
    this.filteredTable = this.table.filter((user) => user.status_usuario === 0);
  }

  bsModalRef?: BsModalRef;

  
  openModalWithComponent(user: any) {
    const nome = user.nome;
    const email = user.email;
    const cargo = user.cargo;
    const telefone = user.telefone;
    const nivel_acesso = user.nivel_acesso;
    const status_usuario = user.status_usurio;
    const empresa = user.nome_instituicao;
    const id_instituicao = user.id_instituicao;
  
    const initialState: ModalOptions = {
      initialState: {
        list: [
          nome,
          email,
          cargo,
          telefone,
          nivel_acesso,
          status_usuario,
          empresa,
          id_instituicao,
        ],
        title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(ModalAcceptDenyUserComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    return user; 
  }

}
