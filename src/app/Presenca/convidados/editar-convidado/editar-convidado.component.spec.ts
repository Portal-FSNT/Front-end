import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConvidadoComponent } from './editar-convidado.component';

describe('EditarConvidadoComponent', () => {
  let component: EditarConvidadoComponent;
  let fixture: ComponentFixture<EditarConvidadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarConvidadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarConvidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
