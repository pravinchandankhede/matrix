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
  tagsString = '';

  constructor(private chunkService: ChunkService, private router: Router) {}

  ngOnInit() {
    if (!this.chunk) {
      this.chunk = {
        ChunkId: '',
        Id: '',
        Name: '',
        Description: '',
        Text: '',
        Type: '',
        ChunkSource: '',
        ChunkSourceId: '',
        CorrelationUId: '',
        CreatedBy: '',
        CreatedAt: new Date().toISOString(),
        UpdatedBy: '',
        UpdatedAt: new Date().toISOString(),
        IsActive: true,
        Version: '',
        Metadata: {},
        Tags: []
      };
    }
    
    // Initialize string representation for form
    this.tagsString = this.chunk.Tags ? this.chunk.Tags.join(', ') : '';
  }

  toggleEdit() {
    this.editMode.update((v: boolean) => !v);
  }

  onSave() {
    if (this.chunk) {
      // Convert tags string back to array
      this.chunk.Tags = this.tagsString.split(',').map(s => s.trim()).filter(s => s.length > 0);
      
      // Update audit fields
      this.chunk.UpdatedAt = new Date().toISOString();
      // UpdatedBy should be set based on current user context
      
      this.chunkService.addChunk(this.chunk).subscribe({
        next: (result: any) => {
          alert('Chunk saved successfully!');
          this.router.navigate(['/chunks']);
        },
        error: (err: any) => {
          alert('Failed to save chunk.');
        }
      });
    }
  }
}
