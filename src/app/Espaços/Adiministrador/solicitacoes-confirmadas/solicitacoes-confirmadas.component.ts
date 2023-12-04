import { Component, OnInit, Input } from '@angular/core';
import { SolicitacoesConfirmadasService } from './solicitacoes-confirmadas.service';
import { SolicitacoesConfirmadas } from './solicitacoes-confirmadas';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-solicitacoes-confirmadas',
  templateUrl: './solicitacoes-confirmadas.component.html',
  styleUrls: ['./solicitacoes-confirmadas.component.scss', '../../../../styles.scss']
})
export class SolicitacoesConfirmadasComponent implements OnInit {

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