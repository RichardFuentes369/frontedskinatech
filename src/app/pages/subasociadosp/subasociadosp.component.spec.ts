import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubasociadospComponent } from './subasociadosp.component';

describe('SubasociadospComponent', () => {
  let component: SubasociadospComponent;
  let fixture: ComponentFixture<SubasociadospComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubasociadospComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubasociadospComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
