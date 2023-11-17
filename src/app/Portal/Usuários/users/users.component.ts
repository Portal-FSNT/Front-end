import { ModalController } from '@ionic/angular';
import { ModalChangeDataUserComponent } from '../../Modal/modal-change-data-user/modal-change-data-user.component';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Users } from './users';
import { UsersService } from './users.service';
import { ModalChangeDataUserService } from '../../Modal/modal-change-data-user/modal-change-data-user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', '../../../../styles.scss'],
  providers: [ModalController]
})
export class UsersComponent {
  
  @Input() user: any;

  table:Users[] = [];
  filteredTable: Users[] = [];

  
  adm: string = 'Administrador';
  soli: string = 'Solicitante';
  
  bsModalRef?: BsModalRef;
  constructor(
    private service: UsersService, 
    private modalService: BsModalService
    ) {}
    
    
    ngOnInit() {
      this.service.listUsers().subscribe((event) => {
        this.table = event.result as Users[];
        console.log(this.filteredTable);
      });
    }


  openModalWithComponent(user: any) {
    const nome = user.nome;
    const email = user.email;
    const cargo = user.cargo;
    const telefone = user.telefone;
    const empresa = user.nome_instituicao;
    const id_instituicao = user.id_instituicao;

    const initialState: ModalOptions = {
      initialState: {
        list: [
          nome,
          email,
          cargo,
          telefone,
          empresa,
          id_instituicao,
        ],
        title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(ModalChangeDataUserComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    return user; 
  }


  
}