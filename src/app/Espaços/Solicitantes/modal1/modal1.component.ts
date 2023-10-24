import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal1',
  templateUrl: './modal1.component.html',
  styleUrls: ['./modal1.component.scss']
})
export class Modal1Component {

  // Recarregar a página quando fechar o modal
  fecharModal(){
    window.location.reload();
  }

}
