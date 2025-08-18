# DataModels - TypeScript Models

This folder contains TypeScript interfaces and types that correspond to the C# models found in the `src/Tools/` directory. These models provide type safety and structure for the Angular frontend application.

## Overview

The TypeScript models are organized to mirror the C# model structure while following TypeScript and Angular conventions:

- **PascalCase** in C# becomes **camelCase** in TypeScript
- **C# Guid** becomes **string** in TypeScript
- **C# nullable types** become **optional properties** (`?`) in TypeScript
- **C# Collections** become **arrays** (`[]`) in TypeScript
- **C# Enums** are mapped to **string enums** in TypeScript

## Model Files

### Core Models

#### `base.model.ts`
- **BaseModel**: Core interface with audit fields (createdBy, createdDate, modifiedBy, modifiedDate, correlationUId, rowVersion, metadata)
- **Metadata**: Key-value metadata storage
- **All Enums**: DataSourceType, AccessMode, AuthenticationType, etc.

*Corresponds to C# models:*
- `Tools/BaseModels/BaseModel.cs`
- `Tools/Tools/Metadata.cs`
- `Tools/DataSources/Enums.cs`

#### `agent.model.ts`
- **Agent**: Main agent entity with capabilities, features, and tools
- **AgentRequest**: Request structure for agent interactions
- **AgentResponse**: Response structure from agent interactions
- **Capability**: Agent capabilities
- **Feature**: Agent features
- **Tool**: Integrated tools

*Corresponds to C# models:*
- `Tools/Agents/Agent.cs`
- `Tools/Agents/AgentRequest.cs`
- `Tools/Agents/AgentResponse.cs`
- `Tools/Features/Capability.cs`
- `Tools/Features/Feature.cs`
- `Tools/Tools/Tool.cs`

#### `chunk.model.ts`
- **Chunk**: Data chunk representation
- **ChunkStrategy**: Strategy for chunking data

*Corresponds to C# models:*
- `Tools/Chunks/Chunk.cs`
- `Tools/Chunks/ChunkStrategy.cs`

#### `model.ts`
- **Model**: AI/ML model configuration

*Corresponds to C# models:*
- `Tools/Models/Model.cs`

### Data Source Models

#### `data-source.model.ts`
- **DataSource**: Main data source interface
- **StructuredDataSource**: For relational databases
- **VectorDataSource**: For vector databases
- **ExternalDataSource**: For API-based sources
- **MultimediaDataSource**: For media files
- **StreamingDataSource**: For real-time data
- **ProprietaryDataSource**: For vendor-specific sources
- **SemiStructuredDataSource**: For NoSQL databases
- **UnstructuredDataSource**: For file-based sources

*Corresponds to C# models:*
- `Tools/DataSources/DataSource.cs`
- `Tools/DataSources/StructuredDataSource.cs`
- `Tools/DataSources/VectorDataSource.cs`
- `Tools/DataSources/ExternalDataSource.cs`
- `Tools/DataSources/MultimediaDataSource.cs`
- `Tools/DataSources/StreamingDataSource.cs`
- `Tools/DataSources/ProprietaryDataSource.cs`
- `Tools/DataSources/SemiStructuredDataSource.cs`
- `Tools/DataSources/UnstructuredDataSource.cs`

#### `data-source-collection.model.ts`
- **DataSourceCollection**: Collection of related data sources

*Corresponds to C# models:*
- `Tools/DataSources/DataSourceCollection.cs`

### Additional Models

#### `knowledge.ts`
- **Knowledge**: Knowledge management entity

*Corresponds to C# models:*
- `Tools/Knowledge/Knowledge.cs`

#### `document.model.ts`
- **Document**: Document representation
- **FixedSizeChunkStrategy**: Fixed size chunking strategy

*Corresponds to C# models:*
- `Tools/Chunks/Document.cs`
- `Tools/Chunks/FixedSizeChunkStrategy.cs`

#### `dataStore.ts`
- **DataStore**: Data storage entity (may need updates when C# equivalent is available)

### `index.ts`
Central export file for all models, providing convenient imports for the rest of the application.

## Usage Examples

```typescript
import { Agent, DataSource, DataSourceType } from './datamodels';

// Create an agent
const agent: Agent = {
  agentUId: '123e4567-e89b-12d3-a456-426614174000',
  name: 'My Agent',
  description: 'A sample agent',
  type: 'AI Assistant',
  capabilities: [],
  status: 'Active',
  version: '1.0.0',
  features: [],
  tools: [],
  // BaseModel properties
  createdBy: 'system',
  createdDate: new Date(),
  modifiedBy: 'system',
  modifiedDate: new Date(),
  correlationUId: '123e4567-e89b-12d3-a456-426614174001',
  rowVersion: new Uint8Array(),
  metadata: []
};

// Create a data source
const dataSource: DataSource = {
  dataSourceUId: '123e4567-e89b-12d3-a456-426614174002',
  name: 'My Database',
  type: DataSourceType.Structured,
  subType: 'PostgreSQL',
  owner: 'admin',
  isActive: true,
  accessMode: AccessMode.ReadWrite,
  authenticationType: AuthenticationType.BasicAuth,
  isCustom: false,
  // BaseModel properties...
  createdBy: 'system',
  createdDate: new Date(),
  modifiedBy: 'system',
  modifiedDate: new Date(),
  correlationUId: '123e4567-e89b-12d3-a456-426614174003',
  rowVersion: new Uint8Array(),
  metadata: []
};
```

## Type Safety

These models provide compile-time type checking and IntelliSense support in TypeScript/Angular applications. They ensure that data structures remain consistent between the frontend and backend.

## Maintenance

When C# models are updated, the corresponding TypeScript models should be updated to maintain consistency. Pay special attention to:

1. Property name casing (PascalCase → camelCase)
2. Type mappings (Guid → string, collections → arrays)
3. Nullable types (C# `string?` → TypeScript `string | undefined` or optional `string?`)
4. Enum value mappings

## Dependencies

These models have minimal dependencies:
- No external packages required
- Uses only built-in TypeScript types
- Compatible with Angular and other TypeScript frameworks
