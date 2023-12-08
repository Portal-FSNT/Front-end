import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletarPessoasComponent } from './modal-deletar-pessoas.component';

describe('ModalDeletarPessoasComponent', () => {
  let component: ModalDeletarPessoasComponent;
  let fixture: ComponentFixture<ModalDeletarPessoasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeletarPessoasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeletarPessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
