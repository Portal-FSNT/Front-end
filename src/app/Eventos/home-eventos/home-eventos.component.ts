import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Evento } from './evento';
import { EventoService } from './evento.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-home-eventos',
  templateUrl: './home-eventos.component.html',
  styleUrls: ['./home-eventos.component.scss' , '../styles.scss']
})
export class HomeEventosComponent implements OnInit {

  @Input() user: any;
  
  @Input() presenca?: boolean;

  eventos: Evento[] = [];

  constructor(
    private modalController:ModalController, 
    private service: EventoService, 
    private router: Router, 
    private route: ActivatedRoute,
    private EventoService: EventoService,
    
    ) { }

  ngOnInit() {
    this.service.listarEvento().subscribe((event) => {
      this.eventos = event
      console.log(this.eventos);
    });

    
    // this.presenca = true;
  }

  changeEvent(card: any) {
    this.router.navigate(['/alterar-evento/', card.id]); 

  }    

  delet(id: number) {
    // this.service.delet(id).subscribe(
    //   () => {
    //     this.router.navigate(["/empresas"]);
    //   },
    //   (error) => console.log(error)
    // );
    this.service.delet(id).subscribe({
      next: (event) => {
        this.router.navigate(["/eventos"]);
        console.log(event);
      },
      error: (error) => {
        console.log('erro: ', error);
        alert(error.error.message);
      },
      complete: () => {
        window.location.reload();
      }
    })
    
  }
  

  


  
}