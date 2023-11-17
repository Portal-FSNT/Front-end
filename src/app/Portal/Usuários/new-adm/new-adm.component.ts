import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewAdmService } from './new-adm.service';
import { Router } from '@angular/router';
import { Instituicoes } from './instituicao';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-new-adm',
  templateUrl: './new-adm.component.html',
  styleUrls: ['./new-adm.component.scss',  '../../../../styles.scss']
})
export class NewAdmComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  instituicao: Instituicoes[] = [];


  constructor(private fb: FormBuilder,
    private service: NewAdmService,
    private router: Router){
    this.form = this.fb.group({
      nome: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      email: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      senha: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      telefone: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      id_instituicao: [[Validators.required]],
      nivel_acesso: [[Validators.required]],
    });
  }

  ngOnInit() {
    this.service.listarInstituicoes().subscribe((instituicaolista) => {
      this.instituicao = instituicaolista
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe(
        () => console.log('Request Completo')
        );
        this.router.navigate(['/users']);
    }

  }
  onCancel() {
    this.submitted = false;
    this.form.reset();
    this.router.navigate(['/users']);
  }


}
