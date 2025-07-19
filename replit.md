# Spin for Love - Date Night Spinner Application

## Overview

This is a full-stack web application that provides a romantic date night spinner wheel where couples can randomly select date activities. The application features a React frontend with a modern UI built using shadcn/ui components, an Express backend with RESTful APIs, and PostgreSQL database integration using Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom romantic theme colors
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and building

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for CRUD operations
- **Middleware**: Custom logging middleware for API requests
- **Error Handling**: Centralized error handling with proper HTTP status codes

### Database Architecture
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM for type-safe database operations
- **Migration**: Drizzle Kit for schema management
- **Connection**: Neon Database serverless PostgreSQL

## Key Components

### Database Schema
The application uses three main tables:
- **users**: User authentication with username/password
- **date_options**: Customizable date activities with labels, weights, colors, and default flags
- **subscriptions**: Newsletter subscription management

### Core Features
1. **Spinner Wheel**: Canvas-based interactive wheel that randomly selects date options
2. **Date Option Management**: Full CRUD operations for creating, updating, and deleting date options
3. **Newsletter Subscription**: Email collection system for date night inspiration
4. **Responsive Design**: Mobile-first design with romantic color scheme

### Storage Layer
- **IStorage Interface**: Abstraction layer for data operations
- **MemStorage**: In-memory storage implementation for development
- **Future Database Storage**: Prepared for PostgreSQL integration

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express routes handle HTTP requests and validate data using Zod schemas
3. **Business Logic**: Route handlers process requests and interact with storage layer
4. **Database Operations**: Drizzle ORM performs type-safe database queries
5. **Response**: Data flows back through the same layers to update the UI

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, Radix UI components
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Data Fetching**: TanStack Query for server state
- **Form Handling**: React Hook Form, Hookform Resolvers
- **Validation**: Zod for schema validation
- **Date Utilities**: date-fns for date manipulation

### Backend Dependencies
- **Server**: Express.js for HTTP server
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Session Management**: connect-pg-simple for PostgreSQL session store
- **Validation**: Zod for request/response validation
- **Development**: tsx for TypeScript execution

### Development Tools
- **Build**: Vite, esbuild for production builds
- **Type Checking**: TypeScript compiler
- **Linting**: ESLint configuration
- **Development**: Replit-specific plugins for enhanced development experience

## Deployment Strategy

### Development Environment
- **Server**: Node.js development server with hot reloading
- **Frontend**: Vite development server with HMR
- **Database**: Environment variable-based PostgreSQL connection

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: esbuild bundles server code into single ESM file
- **Deployment**: Node.js production server serving static files and API

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Session Management**: PostgreSQL-backed sessions for user authentication
- **Static Assets**: Express serves built frontend from dist/public directory

The application follows a modern full-stack architecture with clear separation of concerns, type safety throughout the stack, and a focus on developer experience and maintainability.