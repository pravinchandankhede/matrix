import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkListComponent } from './chunk-list.component';

describe('ChunkListComponent', () => {
  let component: ChunkListComponent;
  let fixture: ComponentFixture<ChunkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChunkListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChunkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
