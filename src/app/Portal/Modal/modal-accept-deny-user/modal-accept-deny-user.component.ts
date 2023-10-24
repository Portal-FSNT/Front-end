import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalAcceptDenyUserSerivce } from './modal-accept-deny-user.service';

@Component({
  selector: 'app-modal-accept-deny-user',
  templateUrl: './modal-accept-deny-user.component.html',
  styleUrls: ['./modal-accept-deny-user.component.scss']
})
export class ModalAcceptDenyUserComponent {
  title?: string;
  closeBtnName?: string;
  list: any[] = [];
  email: string='';
 
  constructor(
    public bsModalRef: BsModalRef,
    private service: ModalAcceptDenyUserSerivce,
  ) {}
 
  ngOnInit(): void {
    if (this.list && this.list.length > 0) {
      this.email = this.list[1];
    }
  }

  denyUser(){
    this.service.UpdateUsers(this.email, 2).subscribe(
      success => console.log('Cadastro do usuario foi negado.'),
      error => console.log('Error, não foi possível concluir a requisição.'),
      () => console.log('Requisição finalizada.')
    );
    window.location.reload();
  }

  acceptUser(){ 
    this.service.UpdateUsers(this.email, 1).subscribe(
      success => console.log('Cadastro do usuario foi Aprovado'),
      error => console.log('Error, não foi possivel concluir a requisição.'),
      () => console.log('Requisição finalizada.')
    );
    window.location.reload();
  }
}
