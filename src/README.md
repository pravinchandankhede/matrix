# Matrix Solution Overview

This repository contains a modular .NET 8 solution for data ingestion, messaging, and integration. The solution is organized into several projects, each with a clear responsibility and well-defined dependencies.

---

## Solution Structure

Framework/  
│  
├── DataIntegration/  
│   └── DataIntegration/  
│       └── DataIntegration.csproj  
│  
├── IngestionLayer/  
│   ├── Ingestion.Chunking/  
│   │   └── Ingestion.Chunking.csproj  
│   ├── Ingestion.Configuration/  
│   │   └── Ingestion.Configuration.csproj  
│   ├── Ingestion.Interfaces/  
│   │   └── Ingestion.Interfaces.csproj  
│   ├── Ingestion.Models/  
│   │   └── Ingestion.Models.csproj  
│   └── Connectors/  
│       └── Ingestion.Connectors.AzureSearch/  
│           └── Ingestion.Connectors.AzureSearch.csproj  
│  
└── Messaging/  
    ├── Messaging.Engine/  
    │   └── Messaging.Engine.csproj  
    ├── Messaging.Interfaces/  
    │   └── Messaging.Interfaces.csproj  
    ├── Messaging.Models/  
    │   └── Messaging.Models.csproj  
    └── Messaging.Connectors/  
        └── Messaging.Connectos.AzureServiceBus/  
            └── Messaging.Connectos.AzureServiceBus.csproj  

---

## Project Details

### DataIntegration

- **Path:** `Framework/DataIntegration/DataIntegration/`
- **Purpose:** Entry point for data integration workflows. Coordinates ingestion and messaging components.
- **Target Framework:** .NET 8

---

### IngestionLayer

#### Ingestion.Chunking

- **Path:** `Framework/IngestionLayer/Ingestion.Chunking/`
- **Purpose:** Handles chunking of large data sets for efficient processing and ingestion.
- **Target Framework:** .NET 8

#### Ingestion.Configuration

- **Path:** `Framework/IngestionLayer/Ingestion.Configuration/`
- **Purpose:** Provides configuration management for ingestion processes.
- **Target Framework:** .NET 8

#### Ingestion.Interfaces

- **Path:** `Framework/IngestionLayer/Ingestion.Interfaces/`
- **Purpose:** Defines interfaces and contracts for ingestion components.
- **Target Framework:** .NET 8
- **References:** `Ingestion.Models`

#### Ingestion.Models

- **Path:** `Framework/IngestionLayer/Ingestion.Models/`
- **Purpose:** Contains data models used throughout the ingestion layer.
- **Target Framework:** .NET 8

#### Ingestion.Connectors.AzureSearch

- **Path:** `Framework/IngestionLayer/Connectors/Ingestion.Connectors.AzureSearch/`
- **Purpose:** Implements a connector for ingesting data into Azure Search.
- **Target Framework:** .NET 8
- **References:** `Ingestion.Interfaces`

---

### Messaging

#### Messaging.Engine

- **Path:** `Framework/Messaging/Messaging.Engine/`
- **Purpose:** Core messaging engine for processing and routing messages.
- **Target Framework:** .NET 8

#### Messaging.Interfaces

- **Path:** `Framework/Messaging/Messaging,Interfaces/`
- **Purpose:** Defines interfaces and contracts for messaging components.
- **Target Framework:** .NET 8
- **References:** `Messaging.Models`

#### Messaging.Models

- **Path:** `Framework/Messaging/Messaging.Models/`
- **Purpose:** Contains data models used throughout the messaging layer.
- **Target Framework:** .NET 8

#### Messaging.Connectos.AzureServiceBus

- **Path:** `Framework/Messaging/Messaging.Connectors/Messaging.Connectos.AzureServiceBus/`
- **Purpose:** Implements a connector for Azure Service Bus messaging.
- **Target Framework:** .NET 8
- **References:** `Messaging.Interfaces`

---

## Build & Run

1. **Requirements:** [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
2. **Restore dependencies:**  dotnet restore3. **Build the solution:**  dotnet build4. **Run a project:**  
   Navigate to the desired project directory and use `dotnet run`.

---

## Notes

- All projects use nullable reference types and implicit usings for modern C# development.
- Assembly and root namespaces are prefixed with `Matrix.` for consistency.
- Project references are used to enforce clear dependencies between interfaces, models, and connectors.

---

## Contributing

Please follow standard .NET and C# coding conventions. Ensure all new projects target .NET 8 and use the established namespace and assembly naming patterns.
