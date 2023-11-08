import { Component, OnInit } from '@angular/core';
import { Visualizar } from './visualizar';
import { VisualizarService } from './visualizar.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss','../../../../styles.scss' ]
})
export class VisualizarComponent implements OnInit {

  solicitacoes:Visualizar[]=[];

  constructor(private service: VisualizarService) { }

  ngOnInit() {
    // this.service.visualizarAgendamentos().subscribe((event) => {
    //   this.solicitacoes = event.result as Visualizar[]
    //   console.log(this.solicitacoes);
    // })
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
// getStatus(valor: number): string {
//   return valor === 1 ? 'Aceito' : 'Pendente';
// }

}
