import { Component, Input, signal, OnInit } from '@angular/core';
import { Model } from '../../../datamodels/model';
import { ModelService } from '../../../services/model.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-model-detail',
    standalone: false,
    templateUrl: './model-detail.component.html',
    styleUrls: ['./model-detail.component.css']
})
export class ModelDetailComponent implements OnInit {
    @Input() model: Model | null = null;
    editMode = signal(true); // Start in edit mode for add screen
    tagsString = '';

    constructor(private modelService: ModelService, private router: Router) { }

    ngOnInit() {
        if (!this.model) {
            this.model = {
                ModelUId: '',
                Id: '',
                Name: '',
                Type: '',
                Version: '',
                Description: '',
                Provider: '',
                Endpoint: '',
                ApiKey: '',
                Region: '',
                IsEnabled: true,
                CreatedBy: '',
                CreatedAt: new Date().toISOString(),
                UpdatedBy: '',
                UpdatedAt: new Date().toISOString(),
                IsActive: true,
                Metadata: {},
                Tags: []
            };
        }
        
        // Initialize string representation for form
        this.tagsString = this.model.Tags ? this.model.Tags.join(', ') : '';
    }

    toggleEdit() {
        this.editMode.update((v: boolean) => !v);
    }

    onSave() {
        if (this.model) {
            // Convert tags string back to array
            this.model.Tags = this.tagsString.split(',').map(s => s.trim()).filter(s => s.length > 0);
            
            // Update audit fields
            this.model.UpdatedAt = new Date().toISOString();
            // UpdatedBy should be set based on current user context
            
            this.modelService.createModel(this.model).subscribe({
                next: (result: any) => {
                    alert('Model saved successfully!');
                    this.router.navigate(['/models']);
                },
                error: (err: any) => {
                    alert('Failed to save model.');
                }
            });
        }
    }
}
