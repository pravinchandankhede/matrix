# Components

The Matrix Agentic Platform is composed of several core components, each mapped to a specific architectural layer:

## Agentic Layer
- **Agent Registry**: Manages agent registration, discovery, and lifecycle.
- **Base Agent**: Abstract base for all agent implementations.
- **Agent Builder**: Fluent builder for agent composition and configuration.

## Model Layer
- **Model Registry**: Handles model registration, versioning, deployment, and monitoring.

## Data Source Layer
- **Data Connectors**: Support for structured, semi-structured, unstructured, multimedia, streaming, and vector data sources.

## Ingestion Layer
- **Chunking Service**: Document splitting, context preservation, metadata extraction.
- **Configuration Service**: Pipeline and processing rules.
- **Connectors**: Integration with Azure Search and custom sources.

## Messaging Layer
- **Messaging Engine**: Message routing, event publication, transformation.
- **Azure Service Bus Connector**: Queue and topic management.

## Data Layer
- **Data Storage**: Persistent storage for agent state, models, and metadata.
- **Message Queues**: Asynchronous communication between services.
- **Vector Database**: Storage for embeddings and vectorized data.
