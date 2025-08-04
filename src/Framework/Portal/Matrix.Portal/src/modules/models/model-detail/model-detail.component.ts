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
                modelUId: '',
                id: '',
                name: '',
                type: '',
                version: '',
                description: '',
                provider: '',
                endpoint: '',
                apiKey: '',
                region: '',
                isEnabled: true,
                createdBy: '',
                createdAt: new Date().toISOString(),
                updatedBy: '',
                updatedAt: new Date().toISOString(),
                isActive: true,
                metadata: {},
                tags: []
            };
        }
        
        // Initialize string representation for form
        this.tagsString = this.model.tags ? this.model.tags.join(', ') : '';
    }

    toggleEdit() {
        this.editMode.update((v: boolean) => !v);
    }

    onSave() {
        if (this.model) {
            // Convert tags string back to array
            this.model.tags = this.tagsString.split(',').map(s => s.trim()).filter(s => s.length > 0);
            
            // Update audit fields
            this.model.updatedAt = new Date().toISOString();
            // updatedBy should be set based on current user context
            
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
