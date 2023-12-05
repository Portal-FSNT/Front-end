import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEventosListaComponent } from './home-eventos-lista.component';

describe('HomeEventosListaComponent', () => {
  let component: HomeEventosListaComponent;
  let fixture: ComponentFixture<HomeEventosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEventosListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEventosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
