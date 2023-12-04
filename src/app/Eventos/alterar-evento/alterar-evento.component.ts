import { Evento } from './../home-eventos/evento';
import { ActivatedRoute, Router } from '@angular/router';
import { AltEventosService } from './alt-eventos.service';
import { CadEventos } from './cad-eventos';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoEvento } from './tipo';
import { Lugares } from './lugar';
import { Instituicoes } from './instituicao';
import { BsModalRef } from "ngx-bootstrap/modal";


@Component({
  selector: 'app-cad-eventos',
  templateUrl: './alterar-evento.component.html',
  styleUrls: ['./alterar-evento.component.scss', '../styles.scss']
})
export class AlterarEventoComponent implements OnInit {
[x: string]: any;

  form: FormGroup;
  submitted = false;
  espacos: CadEventos[] = [];
  tipos: TipoEvento[] = [];
  lugares: Lugares[] = [];
  instituicoes: Instituicoes[] = [];
  eventId: string | null | undefined;
  id_evento: any;
  evento: any;

  constructor(private fb: FormBuilder,
    private service: AltEventosService,
    private router: Router,
    private route: ActivatedRoute,
    private altEventosService: AltEventosService,
    public bsModalRef: BsModalRef,
    ) {

    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
      data_evento: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      hora_inicio: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      hora_termino: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      endereco: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      id_espaco: [[Validators.required]],
      tipo_evento: [[Validators.required]],
      modalidade: [[Validators.required]],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.id_evento = paramMap.get('id');

      console.log("Event Id: " + this.id_evento);

      this.service.buscarEventoPorId(this.id_evento).subscribe(
        (res) => {
          const evento = res.result;
          if (evento) {
            this.evento = evento;
            console.log(evento);
            console.log(evento.nome);
            this.form.setValue(this.evento);
          }
        },
        (error: any) => {
          console.error(error);
        },
        () => {
            this.service.listarLugares().subscribe(
            (results) => {
              this.lugares = results.result;
            },
            (error) => {
              console.error(error);
            }
          );
      
          this.service.listarTipos().subscribe(
            (results) => {
              this.tipos = results.results;
            },
            (error) => {
              console.error(error);
            }
          );
      
          this.service.listarInstituicoes().subscribe(
            (results) => {
              this.instituicoes = results.results;
            },
            (error) => {
              console.error(error);
            }
          );
        }
      );
    });
  }

  onSubmit() {
    console.log('Oi')
    this.submitted = true;
    console.log(this.form.valid);
    console.log(this.form);
    if (this.form.valid) {
      const eventId = +this.route.snapshot.params['id'];
      const campoAtualizado: CadEventos = this.form.value;
    
      this.service.updateEvento(eventId, campoAtualizado).subscribe(
        () => {
          console.log('Sucesso');
          this.router.navigate(['/eventos']);
        },
        (error: any) => {
          console.error(error);
          console.log('Error');
        },
        () => {
          console.log('Request Completo');
        }
      );
    }
  }
  
  onCancel() {
    this.submitted = false;
    this.form.reset();
    this.router.navigate(['/eventos']);
  }

  onDelete() {
    const eventId = +this.route.snapshot.params['id'];
    this.router.navigate(['/eventos']);
    this.altEventosService.deletarEvento(eventId).subscribe(
      response => {
        console.log('Evento excluído com sucesso!', response);
      },
      error => {
        console.error('Erro ao excluir o evento', error);
      }
    );
  }

  updateEvento(id: number) {
    console.log('form', this.form.value);
      if(this.form.valid){
        const reqBody = {
          id: this.form.get('id')?.value,
          nome: this.form.value.nome,
          descricao: this.form.value.descricao,
          data_evento: this.form.value.data_evento,
          hora_inicio: this.form.value.hora_inicio,
          hora_termino: this.form.value.hora_termino,
          endereco: this.form.value.endereco,
          id_espaco: this.form.value.id_espaco,
          tipo_evento: this.form.value.tipo_evento,
          modalidade: this.form.value.modalidade,
          status_evento: "Confirmado",
        }
        console.log('Submit');

        this.service.updateEvento(id, reqBody).subscribe({
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
