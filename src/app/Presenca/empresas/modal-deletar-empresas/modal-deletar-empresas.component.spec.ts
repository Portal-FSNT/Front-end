import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletarEmpresasComponent } from './modal-deletar-empresas.component';

describe('ModalDeletarEmpresasComponent', () => {
  let component: ModalDeletarEmpresasComponent;
  let fixture: ComponentFixture<ModalDeletarEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeletarEmpresasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeletarEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
