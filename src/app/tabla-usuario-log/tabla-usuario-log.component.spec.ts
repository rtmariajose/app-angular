import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaUsuarioLogComponent } from './tabla-usuario-log.component';

describe('TablaUsuarioLogComponent', () => {
  let component: TablaUsuarioLogComponent;
  let fixture: ComponentFixture<TablaUsuarioLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaUsuarioLogComponent ]
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
