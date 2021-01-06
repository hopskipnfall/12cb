import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArenaSimpleComponent } from './arena-simple.component';

describe('ArenaSimpleComponent', () => {
  let component: ArenaSimpleComponent;
  let fixture: ComponentFixture<ArenaSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArenaSimpleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenaSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
