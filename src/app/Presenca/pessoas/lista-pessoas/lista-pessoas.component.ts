//ANGULAR -----
import { Component, Input,OnInit } from "@angular/core";
import { Router } from '@angular/router';
//MODALS -----
import { ModalController } from '@ionic/angular';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
//COMPONENT -----
import { EditarPessoaComponent } from './../editar-pessoa/editar-pessoa.component';
import { NovaPessoaComponent } from './../nova-pessoa/nova-pessoa.component';
//SERVICE -----
import { PessoaService } from './../pessoa.service';
//INTERFACE -----
import { Pessoa } from "../pessoa";

@Component({
  selector: "app-lista-pessoas",
  templateUrl: "./lista-pessoas.component.html",
  styleUrls: ["./lista-pessoas.component.scss","../../navbar-adm.scss"],
})

export class ListaPessoasComponent implements OnInit {
  
  @Input() pessoa: any;

  listaPessoa: Pessoa[] = [];
  
  constructor(
    private service: PessoaService,
    private modalController:ModalController,
    private router:Router,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.service.listar().subscribe((event) => {
      this.listaPessoa = event.result as Pessoa[];
      console.log(this.listaPessoa);
    });
  }

  async add() {
    const modal = await this.modalController.create({
      component:NovaPessoaComponent,
      cssClass:"modal",
    });
    await modal.present();
  }
 
  updatePessoa(pessoa: any){
    console.log(pessoa.id)
    const id = pessoa.id;
    const nome = pessoa.nome;
    const email = pessoa.email;
    const cargo = pessoa.cargo;
    const telefone = pessoa.telefone;
    const empresa = pessoa.empresa;
    const id_empresa = pessoa.id_empresa

    const initialState: ModalOptions = {
      initialState: {
        list: [
          id,
          nome,
          email,
          cargo,
          telefone,
          empresa,
          id_empresa,
        ],
        title: 'Modal update pessoa',
        cssClass:"modal",
      }
    };
    this.bsModalRef = this.modalService.show(EditarPessoaComponent, initialState);
    this.bsModalRef.content.closeBtnName ='Close';
  }

  delet(id:number){
    this.service.delet(id).subscribe(
      sucess => console.log('Sucesso'),
      error => console.log('Error'),
      () => console.log('Requisição completa.')
    );
    window.location.reload();
  }

  bsModalRef?: BsModalRef;
  novoPessoa(){
    this.bsModalRef = this.modalService.show(NovaPessoaComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}

//PROJETO_ORIGINAL - MODAL_EDITAR_PESSOA -----
    // async edit(pessoa: any){
    //   const id = pessoa.id;
    //   const nome = pessoa.nome;
    //   const email = pessoa.email;
    //   const cargo = pessoa.cargo;
    //   const empresa = pessoa.empresa;
    //   const id_empresa = pessoa.id_empresa

    //   const modal=await this.modalController.create({
    //       component:EditarPessoaComponent,
    //       componentProps:{
    //         id,
    //         nome,
    //         email,
    //         cargo,
    //         empresa,
    //         id_empresa,
    //       },
    //       cssClass:"modal",
    //     });
    //     await modal.present();
    // }