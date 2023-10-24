import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portalfsnt';
  modalRef: BsModalRef | undefined;

  constructor(private modalService: BsModalService) {}

  openModal() {
    this.modalRef = this.modalService.show(ModalModule);
}}
