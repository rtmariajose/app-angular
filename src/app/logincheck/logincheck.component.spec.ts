import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincheckComponent } from './logincheck.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

describe('LogincheckComponent', () => {
  let component: LogincheckComponent;
  let fixture: ComponentFixture<LogincheckComponent>;

  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule,ReactiveFormsModule],
      declarations: [ LogincheckComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ email: null })
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogincheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*  it('should deny access with incorrect password',() =>{component.loginForm = formBuilder.group({
    email:'rt.mariajose@gmail.com',
    password:'111'
  });
  fixture.nativeElement.querySelector('button'.click())
  })*/
});
