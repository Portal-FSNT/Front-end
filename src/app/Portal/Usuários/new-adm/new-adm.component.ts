import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewAdmService } from './new-adm.service';
import { Router } from '@angular/router';
import { Empresas } from './empresa.interface';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-new-adm',
  templateUrl: './new-adm.component.html',
  styleUrls: ['./new-adm.component.scss',  '../../../../styles.scss']
})
export class NewAdmComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  empresa: Empresas[] = [];


  constructor(private fb: FormBuilder,
    private service: NewAdmService,
    private router: Router){
    this.form = this.fb.group({
      nome: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      email: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      senha: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      cargo: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      telefone: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      nivelAcesso:  [null,[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      statusUsuario: 1,
      instituicao: [],
    });
  }

  ngOnInit() {
    this.service.listarEmpresas().subscribe(
      (results) => {
        this.empresa = results.results;
      },
      (error) => {
        console.error(error);
      }
    );
    
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('Submit');
      this.service.create(this.form.value).subscribe(
        sucess => console.log('Sucesso'),
        error => console.log('Error'),
        () => console.log('Rquest Completo')
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
