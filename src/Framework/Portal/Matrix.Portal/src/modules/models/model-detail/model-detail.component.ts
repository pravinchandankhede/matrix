import { Component, Input, signal, OnInit } from '@angular/core';
import { Model } from '../../../datamodels/model';
import { ModelService } from '../../../services/model.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-model-detail',
    standalone : false,
    templateUrl: './model-detail.component.html',
    styleUrls: ['./model-detail.component.css']
})
export class ModelDetailComponent implements OnInit {
    @Input() model: Model | null = null;
    editMode = signal(true); // Start in edit mode for add screen

    constructor(private modelService: ModelService, private router: Router) { }

    ngOnInit() {
        if (!this.model) {
            this.model = {
                name: '',
                type: '',
                version: '',
                description: '',
                provider: '',
                endpoint: '',
                apiKey: '',
                region: '',
                isEnabled: true
            };
        }
    }

    toggleEdit() {
        this.editMode.update((v: boolean) => !v);
    }

    onSave() {
        if (this.model) {
            this.modelService.createModel(this.model).subscribe({
                next: (result) => {
                    alert('Model saved successfully!');
                    this.router.navigate(['/models']);
                },
                error: (err) => {
                    alert('Failed to save model.');
                }
            });
        }
    }
}
