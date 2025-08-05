/**
 * Base interface containing common audit fields and properties
 * that are shared across all domain models.
 */
export interface BaseModel {
  /** Unique identifier for the entity */
  Id: string;
  
  /** Display name of the entity */
  Name: string;
  
  /** Optional description of the entity */
  Description?: string;
  
  /** User or system that created this entity */
  CreatedBy: string;
  
  /** Timestamp when the entity was created (ISO date string) */
  CreatedAt: string;
  
  /** User or system that last updated this entity */
  UpdatedBy?: string;
  
  /** Timestamp when the entity was last updated (ISO date string) */
  UpdatedAt?: string;
  
  /** Whether the entity is currently active/enabled */
  IsActive: boolean;
  
  /** Version number for optimistic concurrency control */
  Version?: string;
  
  /** Additional metadata as key-value pairs */
  Metadata?: { [key: string]: string };
  
  /** Tags for categorization and filtering */
  Tags?: string[];
}

/**
 * Base interface for entities that can be customized by users
 */
export interface CustomizableModel extends BaseModel {
  /** Whether this is a custom user-created entity */
  IsCustom: boolean;
  
  /** Owner of the entity */
  Owner: string;
}
