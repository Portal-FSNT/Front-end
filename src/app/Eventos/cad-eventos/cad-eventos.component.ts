import { Router } from '@angular/router';
import { CadEventosService } from './cad-eventos.service';
import { CadEventos } from './cad-eventos';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoEvento } from './tipo';
import { Lugares } from './lugar';
import { Instituicoes } from './instituicao';

@Component({
  selector: 'app-cad-eventos',
  templateUrl: './cad-eventos.component.html',
  styleUrls: ['./cad-eventos.component.scss', '../styles.scss']
})
export class CadEventosComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  espacos: CadEventos[] = [];
  lugares: Lugares[] = [];

  constructor(private fb: FormBuilder,
    private service: CadEventosService,
    private router: Router) {

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

    this.service.listarLugares().subscribe((lugareslista) => {
        this.lugares = lugareslista
      });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe(
        () => console.log('Request Completo')
        );
        this.router.navigate(['/eventos']);
    }

  }
  onCancel() {
    this.submitted = false;
    this.form.reset();
    this.router.navigate(['/eventos']);
  }
}
