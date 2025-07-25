import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceDetailComponent } from './data-source-detail.component';

describe('DataSourceDetailComponent', () => {
  let component: DataSourceDetailComponent;
  let fixture: ComponentFixture<DataSourceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataSourceDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSourceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
