import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorConnectionDetailsComponent } from './vector-connection-details.component';

describe('VectorConnectionDetailsComponent', () => {
  let component: VectorConnectionDetailsComponent;
  let fixture: ComponentFixture<VectorConnectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VectorConnectionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VectorConnectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
