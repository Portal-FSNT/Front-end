import { Evento } from './../home-eventos/evento';
import { ActivatedRoute, Router } from '@angular/router';
import { AltEventosService } from './alt-eventos.service';
import { CadEventos } from './cad-eventos';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoEvento } from './tipo';
import { Lugares } from './lugar';
import { Instituicoes } from './instituicao';

@Component({
  selector: 'app-cad-eventos',
  templateUrl: './alterar-evento.component.html',
  styleUrls: ['./alterar-evento.component.scss', '../styles.scss']
})
export class AlterarEventoComponent implements OnInit {

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
    private route: ActivatedRoute) {

    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
      data_inicio: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      data_termino: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      hora_inicio: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      hora_termino: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      endereco: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      id_lugar: [],
      id_tipo: [],
      id_instituicao: [],
    });
    // this.form = this.fb.group({
    //   nome: 'teste',
    //   descricao: 'teste',
    //   data_inicio: '20/02/2023',
    //   data_termino: '20/02/2023',
    //   hora_inicio: '12:12:12',
    //   hora_termino: '12:12:12',
    //   id_usuario: 5,
    //   id_lugar: 1,
    //   id_tipo: 1,
    //   id_instituicao: 1
    // });
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
}
