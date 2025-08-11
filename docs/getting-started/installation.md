# Installation Guide

Complete installation guide for Matrix Portal development environment.

## Prerequisites

Before installing Matrix Portal, ensure you have the following prerequisites installed:

### Required Software

| Software | Version | Purpose |
|----------|---------|---------|
| **Node.js** | 18.x or 20.x | JavaScript runtime |
| **npm** | 8.x+ | Package manager |
| **Git** | 2.x+ | Version control |
| **Angular CLI** | 17.x+ | Angular development tools |

### Optional Tools

| Tool | Purpose |
|------|---------|
| **Visual Studio Code** | Recommended IDE |
| **Chrome DevTools** | Debugging and testing |
| **Postman** | API testing |

## Step-by-Step Installation

### 1. Install Node.js

Download and install Node.js from [nodejs.org](https://nodejs.org/)

```bash
# Verify installation
node --version
npm --version
```

### 2. Install Angular CLI

```bash
# Install globally
npm install -g @angular/cli

# Verify installation
ng version
```

### 3. Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/your-org/matrix-portal.git
cd matrix-portal
```

### 4. Install Dependencies

```bash
# Install project dependencies
npm install

# Verify installation
npm list --depth=0
```

### 5. Environment Configuration

Create environment configuration files:

```bash
# Copy environment template
cp src/environments/environment.example.ts src/environments/environment.ts
```

Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7179',
  auth: {
    domain: 'your-auth-domain',
    clientId: 'your-client-id',
    audience: 'your-api-audience'
  }
};
```

### 6. Start Development Server

```bash
# Start the development server
ng serve

# Or with specific port
ng serve --port 4200
```

Open your browser and navigate to `http://localhost:4200`

## Verification

Verify your installation by running:

```bash
# Run tests
npm test

# Build the project
npm run build

# Lint the code
npm run lint
```

## Troubleshooting

### Common Issues

**Node version conflicts:**
```bash
# Use nvm to manage Node versions
nvm install 18
nvm use 18
```

**Permission errors on Windows:**
```bash
# Run as administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Port already in use:**
```bash
# Use different port
ng serve --port 4201
```

**Module not found errors:**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Getting Help

- Check the [Troubleshooting Guide](../maintenance/troubleshooting.md)
- Review [Common Issues](../maintenance/troubleshooting.md#common-issues)
- Contact the development team

## Next Steps

- [Development Setup](development-setup.md) - Configure your development environment
- [Project Structure](project-structure.md) - Understand the codebase organization
- [Development Standards](../development/standards.md) - Learn our coding standards
