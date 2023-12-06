import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacosListaComponent } from './espacos-lista.component';

describe('EspacosListaComponent', () => {
  let component: EspacosListaComponent;
  let fixture: ComponentFixture<EspacosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspacosListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspacosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
