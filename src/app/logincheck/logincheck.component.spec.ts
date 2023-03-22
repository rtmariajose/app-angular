import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincheckComponent } from './logincheck.component';

describe('LogincheckComponent', () => {
  let component: LogincheckComponent;
  let fixture: ComponentFixture<LogincheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogincheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogincheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
