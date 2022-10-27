import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasAdesivasComponent } from './notas-adesivas.component';

describe('NotasAdesivasComponent', () => {
  let component: NotasAdesivasComponent;
  let fixture: ComponentFixture<NotasAdesivasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotasAdesivasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotasAdesivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
