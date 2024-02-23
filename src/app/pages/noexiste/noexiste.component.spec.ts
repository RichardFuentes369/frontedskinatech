import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoexisteComponent } from './noexiste.component';

describe('NoexisteComponent', () => {
  let component: NoexisteComponent;
  let fixture: ComponentFixture<NoexisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoexisteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoexisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
