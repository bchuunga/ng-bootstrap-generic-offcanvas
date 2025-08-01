import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCanvasWrapperComponent } from './off-canvas-wrapper.component';

describe('OffCanvasWrapperComponent', () => {
  let component: OffCanvasWrapperComponent;
  let fixture: ComponentFixture<OffCanvasWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffCanvasWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffCanvasWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
