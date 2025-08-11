# # API Reference

> Complete REST API documentation for Matrix Portal, enabling seamless integration and automation.

## 🚀 API Overview

Matrix Portal provides a comprehensive REST API that enables programmatic access to all platform features. The API follows RESTful principles with consistent resource naming, HTTP methods, and response formats.

### Base URL
```
Production: https://api.matrix-portal.com/v1
Development: https://dev-api.matrix-portal.com/v1
Local: http://localhost:7179/api
```

### API Versioning
All API endpoints are versioned to ensure backward compatibility:
- **Current Version**: `v1`
- **Version Header**: `Accept: application/vnd.matrix-portal.v1+json`
- **URL-based Versioning**: `/api/v1/`

## 🔐 Authentication

### Bearer Token Authentication
All API requests require authentication using JWT tokens:

```http
Authorization: Bearer {your-jwt-token}
Content-Type: application/json
```

### Obtaining Access Tokens

#### Login with Credentials
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...",
    "expiresIn": 3600,
    "tokenType": "Bearer"
  },
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "roles": ["user"]
  }
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4..."
}
```

### API Key Authentication (Service-to-Service)
For automated integrations, use API keys:

```http
X-API-Key: your-api-key
Content-Type: application/json
```

## 📊 Response Format

### Standard Response Structure
All API responses follow a consistent format:

```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully",
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req-12345"
}
```

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "name",
        "message": "Name is required"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req-12345"
}
```

### HTTP Status Codes
| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 204 | No Content | Request successful, no content returned |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource conflict |
| 422 | Unprocessable Entity | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

## 🔗 Core Resources

### Agents API
Manage AI agents and their configurations.

#### Endpoints Overview
- `GET /api/agents` - List all agents
- `POST /api/agents` - Create new agent
- `GET /api/agents/{id}` - Get agent details
- `PUT /api/agents/{id}` - Update agent
- `DELETE /api/agents/{id}` - Delete agent
- `POST /api/agents/{id}/deploy` - Deploy agent
- `POST /api/agents/{id}/test` - Test agent

#### Example: Create Agent
```http
POST /api/agents
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Customer Support Bot",
  "description": "Automated customer support agent",
  "modelId": "gpt-4-turbo",
  "capabilities": ["faq", "order_tracking", "escalation"],
  "parameters": {
    "temperature": 0.7,
    "maxTokens": 1000,
    "timeoutMs": 30000
  },
  "constraints": {
    "maxConcurrency": 10,
    "rateLimit": 100,
    "allowedDomains": ["support.company.com"]
  }
}
```

### Models API
Manage machine learning models and their deployments.

#### Endpoints Overview
- `GET /api/models` - List all models
- `POST /api/models` - Register new model
- `GET /api/models/{id}` - Get model details
- `PUT /api/models/{id}` - Update model metadata
- `DELETE /api/models/{id}` - Delete model
- `POST /api/models/{id}/versions` - Create model version
- `GET /api/models/{id}/metrics` - Get model performance metrics

### Data Sources API
Manage data source connections and configurations.

#### Endpoints Overview
- `GET /api/datasources` - List all data sources
- `POST /api/datasources` - Create data source
- `GET /api/datasources/{id}` - Get data source details
- `PUT /api/datasources/{id}` - Update data source
- `DELETE /api/datasources/{id}` - Delete data source
- `POST /api/datasources/{id}/test` - Test connection
- `GET /api/datasources/{id}/schema` - Get data schema

### Collections API
Manage data collections and their metadata.

#### Endpoints Overview
- `GET /api/collections` - List all collections
- `POST /api/collections` - Create collection
- `GET /api/collections/{id}` - Get collection details
- `PUT /api/collections/{id}` - Update collection
- `DELETE /api/collections/{id}` - Delete collection
- `POST /api/collections/{id}/sync` - Sync collection data

## 🔍 Query Parameters

### Pagination
All list endpoints support pagination:

```http
GET /api/agents?page=1&pageSize=20&sortBy=name&sortOrder=asc
```

**Parameters:**
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 20, max: 100)
- `sortBy` - Field to sort by
- `sortOrder` - Sort direction (asc/desc)

### Filtering
Use query parameters to filter results:

```http
GET /api/agents?status=active&modelId=gpt-4&capabilities=faq,support
```

### Field Selection
Specify which fields to include in the response:

```http
GET /api/agents?fields=id,name,status,createdAt
```

### Search
Full-text search across relevant fields:

```http
GET /api/agents?search=customer support
```

## 📡 Real-time API

### WebSocket Connection
Connect to real-time updates:

```javascript
const ws = new WebSocket('wss://api.matrix-portal.com/v1/ws');

// Authentication
ws.send(JSON.stringify({
  type: 'auth',
  token: 'your-jwt-token'
}));

// Subscribe to agent status updates
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'agent-status',
  agentId: 'agent-123'
}));
```

### Webhook Notifications
Configure webhooks to receive notifications about platform events:

```http
POST /api/webhooks
Authorization: Bearer {token}
Content-Type: application/json

{
  "url": "https://your-app.com/webhooks/matrix-portal",
  "events": ["agent.deployed", "model.updated", "datasource.synced"],
  "secret": "your-webhook-secret"
}
```

## 🚦 Rate Limiting

### Rate Limits
- **Authenticated requests**: 1000 requests per hour
- **Unauthenticated requests**: 100 requests per hour
- **Webhook delivery**: 10 requests per second

### Rate Limit Headers
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642234800
X-RateLimit-Window: 3600
```

### Rate Limit Exceeded Response
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "retryAfter": 3600
  }
}
```

## 🔄 Bulk Operations

### Batch Requests
Perform multiple operations in a single request:

```http
POST /api/batch
Authorization: Bearer {token}
Content-Type: application/json

{
  "requests": [
    {
      "method": "POST",
      "url": "/api/agents",
      "body": { /* agent data */ }
    },
    {
      "method": "PUT",
      "url": "/api/agents/123",
      "body": { /* updated agent data */ }
    }
  ]
}
```

### Bulk Import/Export
Export data for backup or migration:

```http
GET /api/export?resources=agents,models&format=json
```

Import data from external sources:

```http
POST /api/import
Content-Type: multipart/form-data

file: exported-data.json
```

## 📚 SDKs & Libraries

### Official SDKs
- **JavaScript/TypeScript**: `@matrix-portal/sdk`
- **Python**: `matrix-portal-python`
- **C#**: `MatrixPortal.SDK`
- **Java**: `matrix-portal-java`

### JavaScript SDK Example
```javascript
import { MatrixPortalClient } from '@matrix-portal/sdk';

const client = new MatrixPortalClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.matrix-portal.com/v1'
});

// Create an agent
const agent = await client.agents.create({
  name: 'My Agent',
  modelId: 'gpt-4',
  capabilities: ['faq', 'support']
});

// List agents with filtering
const agents = await client.agents.list({
  status: 'active',
  page: 1,
  pageSize: 10
});
```

### Python SDK Example
```python
from matrix_portal import MatrixPortalClient

client = MatrixPortalClient(
    api_key='your-api-key',
    base_url='https://api.matrix-portal.com/v1'
)

# Create an agent
agent = client.agents.create({
    'name': 'My Agent',
    'modelId': 'gpt-4',
    'capabilities': ['faq', 'support']
})

# List agents
agents = client.agents.list(status='active', page=1, page_size=10)
```

## 🔧 Testing & Development

### API Testing Tools
- **Postman Collection**: [Download Collection](https://api.matrix-portal.com/postman)
- **OpenAPI Spec**: [Download Spec](https://api.matrix-portal.com/openapi.json)
- **Swagger UI**: [Interactive Documentation](https://api.matrix-portal.com/docs)

### Development Environment
Set up a local development environment:

```bash
# Clone the SDK
git clone https://github.com/matrix-portal/sdk-javascript
cd sdk-javascript

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev
```

## 📈 Monitoring & Analytics

### API Metrics
Track API usage and performance:

```http
GET /api/metrics/usage?startDate=2024-01-01&endDate=2024-01-31
```

### Health Check
Monitor API health:

```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "version": "1.2.3",
  "uptime": 123456,
  "dependencies": {
    "database": "healthy",
    "cache": "healthy",
    "queue": "healthy"
  }
}
```

---

*Ready to integrate? Start with our [REST API Guide](rest-api.md) for detailed endpoint documentation or explore the [SDK Documentation](sdk.md) for language-specific implementation guides.*

This section provides reference documentation for the Matrix Agentic Platform APIs.
