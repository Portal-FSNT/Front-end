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
    private service: UsersService, private modalcontroler: ModalController) {}
    
    
    ngOnInit() {
      this.service.listUsers().subscribe({
        next: (event) => {
          this.filteredTable = event
         console.log(this.filteredTable, event);
       },
        error: (error) => {
        console.log('erro: ', error);
        }
      });
    }
  
}