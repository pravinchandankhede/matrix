import { Component, Input, signal, OnInit } from '@angular/core';
import { Chunk } from '../../../datamodels/chunk.model';
import { ChunkService } from '../../../services/chunk.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chunk-detail',
  standalone: false,
  templateUrl: './chunk-detail.component.html',
  styleUrls: ['./chunk-detail.component.css']
})
export class ChunkDetailComponent implements OnInit {
  @Input() chunk: Chunk | null = null;
  editMode = signal(true); // Start in edit mode for add screen

  constructor(private chunkService: ChunkService, private router: Router) {}

  ngOnInit() {
    if (!this.chunk) {
      this.chunk = {
        chunkId: '',
        text: '',
        type: '',
        chunkSource: '',
        chunkSourceId: '',
        correlationUId: ''
      };
    }
  }

  toggleEdit() {
    this.editMode.update((v: boolean) => !v);
  }

  onSave() {
    if (this.chunk) {
      this.chunkService.addChunk(this.chunk).subscribe({
        next: (result: any) => {
          alert('Chunk added successfully!');
          this.router.navigate(['/chunks']);
        },
        error: (err: any) => {
          alert('Failed to add chunk.');
        }
      });
    }
  }
}
