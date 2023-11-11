import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Modal4Component } from '../modal4/modal4.component';
import { Espaco } from './espaco';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspacosNovoService } from './espacos-novo.service';
import { Router } from '@angular/router';
import { Instituicoes } from './instituicao';


@Component({
  selector: 'app-espacos-novo',
  templateUrl: './espacos-novo.component.html',
  styleUrls: ['./espacos-novo.component.scss', '../../../../styles.scss']
})


export class EspacosNovoComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  instituicao: Instituicoes[] = [];

  constructor(private fb: FormBuilder,
    private service: EspacosNovoService,
    private router: Router) {

    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
      ponto_referencia: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      localizacao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      id_instituicao: [[Validators.required]],
    });
  }

  ngOnInit() {
    this.service.listarInstituicoes().subscribe((instituicaolista) => {
        this.instituicao = instituicaolista
      });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe(
        () => console.log('Request Completo')
        );
        this.router.navigate(['/espacos']);
    }

  }
}


