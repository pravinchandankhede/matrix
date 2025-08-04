/**
 * Base interface containing common audit fields and properties
 * that are shared across all domain models.
 */
export interface BaseModel {
  /** Unique identifier for the entity */
  id: string;
  
  /** Display name of the entity */
  name: string;
  
  /** Optional description of the entity */
  description?: string;
  
  /** User or system that created this entity */
  createdBy: string;
  
  /** Timestamp when the entity was created (ISO date string) */
  createdAt: string;
  
  /** User or system that last updated this entity */
  updatedBy?: string;
  
  /** Timestamp when the entity was last updated (ISO date string) */
  updatedAt?: string;
  
  /** Whether the entity is currently active/enabled */
  isActive: boolean;
  
  /** Version number for optimistic concurrency control */
  version?: string;
  
  /** Additional metadata as key-value pairs */
  metadata?: { [key: string]: string };
  
  /** Tags for categorization and filtering */
  tags?: string[];
}

/**
 * Base interface for entities that can be customized by users
 */
export interface CustomizableModel extends BaseModel {
  /** Whether this is a custom user-created entity */
  isCustom: boolean;
  
  /** Owner of the entity */
  owner: string;
}
