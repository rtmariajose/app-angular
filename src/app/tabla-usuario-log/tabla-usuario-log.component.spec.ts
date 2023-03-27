import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaUsuarioLogComponent } from './tabla-usuario-log.component';
import {HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, convertToParamMap} from "@angular/router";

describe('TablaUsuarioLogComponent', () => {
  let component: TablaUsuarioLogComponent;
  let fixture: ComponentFixture<TablaUsuarioLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaUsuarioLogComponent ],
      imports: [ HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ email: '' })
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaUsuarioLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
