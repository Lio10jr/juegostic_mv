import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncuentrosPage } from './encuentros.page';

describe('EncuentrosPage', () => {
  let component: EncuentrosPage;
  let fixture: ComponentFixture<EncuentrosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EncuentrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
