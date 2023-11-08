import { Component, OnInit, Input } from '@angular/core';
import { SolicitacoesConfirmadasService } from './solicitacoes-confirmadas.service';
import { SolicitacoesConfirmadas } from './solicitacoes-confirmadas';

@Component({
  selector: 'app-solicitacoes-confirmadas',
  templateUrl: './solicitacoes-confirmadas.component.html',
  styleUrls: ['./solicitacoes-confirmadas.component.scss', '../../../../styles.scss']
})
export class SolicitacoesConfirmadasComponent implements OnInit {

  table:SolicitacoesConfirmadas[] = [];

  constructor(
    private service: SolicitacoesConfirmadasService
  ) { }

  ngOnInit() {
      // this.service.listarSolicitacoesConfirmadas().subscribe((event) => {
      //   this.table = event.result as SolicitacoesConfirmadas[]
      //   console.log(this.table);
      // })
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