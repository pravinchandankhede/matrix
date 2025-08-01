import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuredConnectionDetailsComponent } from './structured-connection-details.component';

describe('StructuredConnectionDetailsComponent', () => {
  let component: StructuredConnectionDetailsComponent;
  let fixture: ComponentFixture<StructuredConnectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StructuredConnectionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StructuredConnectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
