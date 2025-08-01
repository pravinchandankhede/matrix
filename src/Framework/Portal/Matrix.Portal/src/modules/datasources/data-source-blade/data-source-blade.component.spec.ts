import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceBladeComponent } from './data-source-blade.component';

describe('DataSourceBladeComponent', () => {
  let component: DataSourceBladeComponent;
  let fixture: ComponentFixture<DataSourceBladeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataSourceBladeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSourceBladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
