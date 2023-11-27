import { Component, OnInit } from '@angular/core';
import { Visualizar } from './visualizar';
import { VisualizarService } from './visualizar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss','../../../../styles.scss' ]
})
export class VisualizarComponent implements OnInit {

  form!:FormGroup;
  list: string[] = [];
  solicitacoes:Visualizar[]=[];

  constructor(
    private service: VisualizarService, 
    private fb : FormBuilder,
    ) { }
  

  ngOnInit() {
    this.service.visualizarAgendamentos().subscribe({
      next: (event) => {
        this.solicitacoes = event
        console.log(this.solicitacoes, event);
      },
      error: (error) => {
        console.log('erro: ', error);
      }
    })
  }
}

