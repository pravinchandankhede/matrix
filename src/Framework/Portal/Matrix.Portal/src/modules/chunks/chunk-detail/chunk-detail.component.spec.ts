import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkDetailComponent } from './chunk-detail.component';

describe('ChunkDetailComponent', () => {
  let component: ChunkDetailComponent;
  let fixture: ComponentFixture<ChunkDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChunkDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChunkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
