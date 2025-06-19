# Matrix

This repo provides a Agentic AI Framework 


# This is main title

```mermaid
graph TD
  %% Layer 1 Subgraph
  subgraph Layer1[Layer 1]
    A1[Block A]
    B1[Block B]
    C1[Block C]
  end

  %% Layer 2 Subgraph
  subgraph Layer2[Data Layer]
    A2[Ingestion]
    B2[Vectorization]
    C2[Vector]
  end

  %% Connections between layers
  
  B1 --> B2
  C1 --> C2
  A1 --> Layer2
```