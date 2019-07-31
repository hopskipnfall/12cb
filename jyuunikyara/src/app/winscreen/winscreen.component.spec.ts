import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinscreenComponent } from './winscreen.component';

describe('WinscreenComponent', () => {
  let component: WinscreenComponent;
  let fixture: ComponentFixture<WinscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
