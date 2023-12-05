import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletarEventosComponent } from './modal-deletar-eventos.component';

describe('ModalDeletarEventosComponent', () => {
  let component: ModalDeletarEventosComponent;
  let fixture: ComponentFixture<ModalDeletarEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeletarEventosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeletarEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
