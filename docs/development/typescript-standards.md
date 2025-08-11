## TypeScript Standards

### Strict TypeScript Configuration

Matrix Portal enforces strict TypeScript settings for maximum type safety and code quality.

#### tsconfig.json Configuration

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022", "DOM"],
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noPropertyAccessFromIndexSignature": true,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false,
    "noFallthroughCasesInSwitch": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Type Definition Standards

#### Interface and Type Definitions

```typescript
// âœ… GOOD: Comprehensive interface with documentation
/**
 * Represents an AI agent in the Matrix Portal system
 */
interface Agent extends BaseModel {
    /** Unique identifier for the agent */
    readonly agentUId: string;
    
    /** Display name of the agent */
    name: string;
    
    /** Optional description of the agent's purpose */
    description?: string;
    
    /** Type categorization of the agent */
    type: AgentType;
    
    /** Current operational status */
    status: AgentStatus;
    
    /** Version string for tracking updates */
    version: string;
    
    /** Available capabilities this agent can perform */
    capabilities: readonly Capability[];
    
    /** Features enabled for this agent */
    features: readonly Feature[];
    
    /** Tools available to this agent */
    tools: readonly Tool[];
}

// âœ… GOOD: Strict enum definitions
const enum AgentStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
    DISABLED = 'Disabled',
    MAINTENANCE = 'Maintenance'
}

const enum AgentType {
    BASIC = 'Basic',
    ADVANCED = 'Advanced',
    ENTERPRISE = 'Enterprise',
    CUSTOM = 'Custom'
}

// âœ… GOOD: Union types for finite options
type OperationResult = 'success' | 'error' | 'pending' | 'cancelled';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// âœ… GOOD: Generic interfaces with constraints
interface ApiResponse<T extends object> {
    readonly success: boolean;
    readonly data: T | null;
    readonly error: ApiError | null;
    readonly timestamp: Date;
}

interface Repository<T extends BaseModel> {
    findById(id: string): Promise<T | null>;
    findAll(): Promise<readonly T[]>;
    create(entity: Omit<T, keyof BaseModel>): Promise<T>;
    update(entity: T): Promise<T>;
    delete(id: string): Promise<void>;
}
```

#### Utility Types and Advanced Patterns

```typescript
// âœ… GOOD: Utility types for data transformation
type CreateAgentRequest = Omit<Agent, keyof BaseModel | 'agentUId'>;
type UpdateAgentRequest = Partial<Pick<Agent, 'name' | 'description' | 'status' | 'capabilities'>>;
type AgentSummary = Pick<Agent, 'agentUId' | 'name' | 'status' | 'type'>;

// âœ… GOOD: Mapped types for form handling
type FormData<T> = {
    [K in keyof T]: T[K] extends string | number | boolean ? T[K] : string;
};

type AgentFormData = FormData<Pick<Agent, 'name' | 'description' | 'type' | 'status'>>;

// âœ… GOOD: Conditional types for API responses
type ServiceResult<T> = T extends void 
    ? { success: true } | { success: false; error: string }
    : { success: true; data: T } | { success: false; error: string };

// âœ… GOOD: Template literal types for dynamic keys
type EventName<T extends string> = `on${Capitalize<T>}`;
type AgentEventName = EventName<'create' | 'update' | 'delete'>; // 'onCreate' | 'onUpdate' | 'onDelete'

// âœ… GOOD: Branded types for ID safety
type UUID = string & { readonly __brand: unique symbol };
type AgentId = UUID & { readonly __agentId: unique symbol };
type UserId = UUID & { readonly __userId: unique symbol };

function createAgentId(uuid: string): AgentId {
    // Validate UUID format
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid)) {
        throw new Error('Invalid UUID format');
    }
    return uuid as AgentId;
}
```

---

```typescript
public saveItem(): void {
    if (!this.item) return;

    // Mark all form controls as touched to show validation errors
    this.markFormGroupTouched(this.itemForm);

    // Check form validation
    if (!this.itemForm.valid) {
        const validationErrors = this.getFormValidationErrors(this.itemForm);
        validationErrors.forEach(error => {
            this.notificationService.addError(error, 'Item Detail');
        });
        return;
    }

    // Update item from form values
    this.updateItemFromForm();

    // Continue with save logic...
    if (this.isNew) {
        // Create logic
    } else {
        // Update logic
    }
}

private updateItemFromForm(): void {
    if (!this.item) return;
    
    const formValue = this.itemForm.value;
    this.item.name = formValue.name?.trim() || '';
    this.item.description = formValue.description?.trim() || '';
    // ... update other properties
}
```

### CSS Styling for Validation

**These CSS classes are available globally in `styles.css`:**

```css
/* Form Validation Styles - Available globally */
.field-error {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.field-hint {
    color: #6c757d;
    font-size: 0.875rem;
    font-style: italic;
    margin-top: 0.25rem;
    display: block;
}

/* Form control validation states */
.form-row input.ng-invalid.ng-touched,
.form-row textarea.ng-invalid.ng-touched,
.form-row select.ng-invalid.ng-touched {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.form-row input.ng-valid.ng-touched,
.form-row textarea.ng-valid.ng-touched,
.form-row select.ng-valid.ng-touched {
    border-color: #28a745;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}
```

**âŒ DO NOT add these styles to component CSS files - they are already global.**

### Reference Implementation

**Use the Model Detail Component (`model-detail.component.ts`) as the reference implementation for reactive forms. All other detail components must follow this exact pattern.**

### Required Field Indicators

```html
<!-- Always mark required fields -->
<label>Name: <span class="required">*</span></label>
<input type="text" formControlName="name" placeholder="Enter name" />
```

---


