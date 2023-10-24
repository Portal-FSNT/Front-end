import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoConvidadoComponent } from './novo-convidado.component';

describe('NovoConvidadoComponent', () => {
  let component: NovoConvidadoComponent;
  let fixture: ComponentFixture<NovoConvidadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoConvidadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoConvidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
