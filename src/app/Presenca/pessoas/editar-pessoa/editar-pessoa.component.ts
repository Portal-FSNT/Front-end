// ANGULAR -----
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";
// MODAL -----
import { ModalController } from "@ionic/angular";
// SERVICE -----
import { EmpresaService } from './../../empresas/empresa.service';
import { PessoaService } from "./../pessoa.service";
// INTERFACE -----
import { Pessoa } from "../pessoa";
import { Empresa } from "../nova-pessoa/empresa";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-editar-pessoa",
  templateUrl: "./editar-pessoa.component.html",
  styleUrls: ["./editar-pessoa.component.scss", '../../styles/stylespresenca.scss'],
})
export class EditarPessoaComponent implements OnInit {
  form!: FormGroup;
  listaPessoa: Empresa[] = [];
  list: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: PessoaService,
    private empresaService:EmpresaService,
    public bsModalRef: BsModalRef,
  ) {
    this.form = this.fb.group({
      nome:[this.list[1], [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      email:[this.list[2],[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      cargo :[this.list[3],[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      telefone:[this.list[4],[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      id_empresa:['',[Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    // this.empresaService.listar().subscribe((event)=>{
    //   this.listaPessoa=event.result as Empresa[];
    // })

    this.empresaService.listar().subscribe({
      next: (event) => {
        this.listaPessoa = event
        console.log('sim', this.listaPessoa, event);
      },
      error: (error) => {
        console.log('erro: ', error);
      }
    })
    console.log('é', this.list);
    this.form.patchValue({
      id_empresa: this.list[5]
    })

    
    
  }

  updatePessoa(id: number) {
    console.log('form', this.form.value);
      if(this.form.valid){
        const reqBody = {
          nome: this.form.value.nome,
          email: this.form.value.email,
          cargo: this.form.value.cargo,
          telefone: this.form.value.telefone,
          id_empresa:  this.form.get('id_empresa')?.value,
        }
        console.log('Submit');
        // this.service.updatePessoa(id, reqBody).subscribe(
        //   sucess => console.log('Sucesso'),
        //   error => console.log('Error'),
        //   () => console.log('Requisição completa.')
        // )
        this.service.updatePessoa(id, reqBody).subscribe({
          next: (event) => {
            console.log('sim', event);
          },
          error: (error) => {
            console.log('erro: ', error);
          },
          complete: () => {
            window.location.reload();
          }
        })
    }else{
      alert('Por favor, preencha todos os campos do formulário.')
    } 
  }

}

// PROJETO_ORIGINAL -----
    // editar() {
    //   if (this.form.valid) {
    //     const editaPessoa = this.form.getRawValue() as Pessoa;
    //     this.service
    //       .edit(this.nome, editaPessoa)
    //       .subscribe(() => this.router.navigate(["/convidados"]));
    //     console.log(this.nome, editaPessoa);
    //   }
    // }