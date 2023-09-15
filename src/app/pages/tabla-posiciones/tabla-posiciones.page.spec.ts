import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablaPosicionesPage } from './tabla-posiciones.page';

describe('TablaPosicionesPage', () => {
  let component: TablaPosicionesPage;
  let fixture: ComponentFixture<TablaPosicionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TablaPosicionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
