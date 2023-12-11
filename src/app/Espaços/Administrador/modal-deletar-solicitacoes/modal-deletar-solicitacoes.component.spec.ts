import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletarSolicitacoesComponent } from './modal-deletar-solicitacoes.component';

describe('ModalDeletarSolicitacoesComponent', () => {
  let component: ModalDeletarSolicitacoesComponent;
  let fixture: ComponentFixture<ModalDeletarSolicitacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeletarSolicitacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeletarSolicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
