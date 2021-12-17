import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarHeatmapComponent } from './polar-heatmap.component';

describe('PolarHeatmapComponent', () => {
  let component: PolarHeatmapComponent;
  let fixture: ComponentFixture<PolarHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolarHeatmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
