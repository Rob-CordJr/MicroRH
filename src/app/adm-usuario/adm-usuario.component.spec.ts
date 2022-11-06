import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmUsuarioComponent } from './adm-usuario.component';

describe('AdmUsuarioComponent', () => {
  let component: AdmUsuarioComponent;
  let fixture: ComponentFixture<AdmUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
