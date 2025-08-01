import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceDetailBladeComponent } from './data-source-detail-blade.component';

describe('DataSourceDetailBladeComponent', () => {
  let component: DataSourceDetailBladeComponent;
  let fixture: ComponentFixture<DataSourceDetailBladeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataSourceDetailBladeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSourceDetailBladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
