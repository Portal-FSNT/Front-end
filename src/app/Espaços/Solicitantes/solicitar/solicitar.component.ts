import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { Modal1Component } from '../modal1/modal1.component';
import { SolicitarService } from './solicitar.service';
import { Espaco } from './espaco';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['../../../../styles.scss', './solicitar.component.scss']
})

export class SolicitarComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  espacos: Espaco[] = [];

  constructor(private fb: FormBuilder,
    private service: SolicitarService,
    private router: Router) {

    this.form = this.fb.group({
      descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
      data_uso: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      hora_inicio: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      hora_termino: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      id_espaco: [[Validators.required]],
    });
  }

  ngOnInit() {
    this.service.listarEspacos().subscribe((espacolista) => {
        this.espacos = espacolista
      });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe(
        () => console.log('Request Completo')
        );
        this.router.navigate(['/visualizar']);
    }

  }}
