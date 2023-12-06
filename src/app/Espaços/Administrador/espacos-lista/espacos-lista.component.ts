import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitacoesConfirmadasService } from '../solicitacoes-confirmadas/solicitacoes-confirmadas.service';
import { SolicitacoesConfirmadas } from '../solicitacoes-confirmadas/solicitacoes-confirmadas';
import { Espacos } from '../espacos/espacos';
import { EspacosService } from '../espacos/espacos.service';

@Component({
  selector: 'app-espacos-lista',
  templateUrl: './espacos-lista.component.html',
  styleUrls: ['./espacos-lista.component.scss']
})
export class EspacosListaComponent {

  table:SolicitacoesConfirmadas[] = [];

  constructor(
    private service: SolicitacoesConfirmadasService,
    private router: Router, 

  ) { }

  ngOnInit() {
      this.service.listarSolicitacoesConfirmadas().subscribe({
        next: (event) => {
          this.table = event
          console.log(this.table, event);
        }, 
        error: (error) => {
          console.log('erro: ', error);
        }
      })
  }
}