# RentBQ Dashboard

> A modern React TypeScript dashboard for product (camera and gadget) rental business management

## 📋 Project Overview

**RentBQ** is a comprehensive product rental management system that provides an intuitive dashboard for managing product inventory, bookings, users, and business operations. Built with modern web technologies, it offers a scalable and maintainable solution for rental businesses.

### Key Features

- 🎥 **Product Management** - Complete CRUD operations for product inventory
- 📅 **Booking System** - Rental booking management with payment integration
- 👥 **User Management** - Customer and admin user administration
- 🏷️ **Category Management** - Category Product organization
- 🎨 **Banner Management** - Marketing banner control
- 📊 **Analytics Dashboard** - Business metrics and insights
- 🔐 **Secure Authentication** - JWT-based auth with OTP verification
- 🌙 **Dark/Light Theme** - User preference theme switching
- 📱 **Responsive Design** - Mobile-first responsive interface

## 🛠️ Tech Stack

### Frontend

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TailwindCSS v4** - Utility-first CSS framework

### State Management & Data Fetching

- **TanStack Query (React Query)** - Server state management
- **React Context** - Global state management
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### UI & Components

- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **ApexCharts** - Interactive charts
- **React Icons** - Icon library

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **SVGR** - SVG to React components

## 🏗️ Architecture Overview

The project follows a **feature-based architecture** with clear separation of concerns:

```
src/
├── app/                    # Application core
├── features/               # Feature modules
├── shared/                 # Shared utilities
└── lib/                  # External libraries config
```

## 📁 Feature-Based Folder Structure

### `/src/app/` - Application Core

Contains the main application setup and configuration:

```
app/
├── App.tsx              # Main app component
├── AppProvider.tsx      # Context providers wrapper
└── AppRouter.tsx        # Route configuration
```

**Key Responsibilities:**

- Application bootstrapping
- Provider composition (Auth, Theme, Query, etc.)
- Route definition and protection
- Global error boundaries

### `/src/features/` - Feature Modules

Each feature is self-contained with its own structure:

```
features/
└── auth/                # Authentication feature
    ├── api/             # API calls
    │   └── auth-api.ts
    ├── components/      # Feature components
    │   ├── SignInForm.tsx
    │   ├── SignUpForm.tsx
    │   ├── VerifyOTPForm.tsx
    │   └── layout/
    ├── pages/           # Feature pages
    │   ├── SignIn.tsx
    │   ├── SignUp.tsx
    │   └── VerifyOTP.tsx
    └── types.ts         # Feature types
```

**Feature Structure Pattern:**

- `api/` - API integration and data fetching
- `components/` - Feature-specific UI components
- `hooks/` - Feature-specific custom hooks
- `pages/` - Feature page components
- `types.ts` - TypeScript type definitions
- `schema.ts` - Validation schemas (when needed)

### `/src/shared/` - Shared Resources

Reusable utilities and components across features:

```
shared/
├── components/          # Reusable UI components
│   ├── GuardedRoute.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorFallback.tsx
│   └── ui/              # Base UI components
├── context/             # Global contexts
│   ├── auth-context.tsx
│   └── theme-context.tsx
├── hooks/               # Shared custom hooks
│   └── useUser.ts
├── config/              # Configuration
│   └── path.ts
├── constant/            # Constants
│   └── auth.ts
└── types/               # Shared types
    └── api.ts
```

### `/src/lib/` - External Library Configuration

Configuration for external libraries:

```
lib/
├── api/
│   ├── api-client.ts    # HTTP client setup
│   └── query-client.ts  # React Query config
└── utils.ts             # Utility functions
```

## 🔐 Authentication Mechanism

### Authentication Flow

1. **Registration Process:**

   ```
   User Registration → Email Verification → Account Created
   ```

2. **Login Process:**
   ```
   Email Input → OTP Request → OTP Verification → JWT Token → Dashboard Access
   ```

### Authentication Architecture

#### Context Provider (`/src/shared/context/auth-context.tsx`)

```typescript
type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  logout: () => void;
};
```

**Key Features:**

- Cookie-based token storage
- Automatic token validation
- Query cache invalidation on logout
- Authentication state management

#### Route Protection (`/src/shared/components/GuardedRoute.tsx`)

- **Public Routes** - Accessible without authentication
- **Protected Routes** - Require valid JWT token
- **Automatic Redirects** - Redirect based on auth state

#### API Integration (`/src/features/auth/api/auth-api.ts`)

```typescript
const AuthService = {
  register(name: string, email: string): Promise<User>
  requestOtp(email: string): Promise<OtpResponse>
  verifyOtp(email: string, otp: string): Promise<AuthResponse>
  getCurrentUser(): Promise<User>
}
```

### Security Features

- **JWT Token Management** - Secure token storage in HTTP-only cookies
- **OTP Verification** - Two-factor authentication for login
- **Route Guards** - Protected route access control
- **Token Expiration** - Automatic logout on token expiry
- **CSRF Protection** - Cookie-based authentication

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd rent-bq-dashboard
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment setup:**

   ```bash
   cp .env.example .env
   ```

   Configure your environment variables:

   ```env
   VITE_API_BASE_URL=your_api_base_url
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Project Structure Benefits

### Feature-Based Architecture Advantages

1. **Scalability** - Easy to add new features without affecting existing code
2. **Maintainability** - Clear separation of concerns and responsibilities
3. **Reusability** - Shared components and utilities across features
4. **Team Collaboration** - Multiple developers can work on different features
5. **Testing** - Isolated feature testing and mocking

### Code Organization Principles

- **Single Responsibility** - Each module has a clear purpose
- **Dependency Inversion** - Features depend on shared abstractions
- **Open/Closed Principle** - Easy to extend without modification
- **DRY (Don't Repeat Yourself)** - Shared utilities prevent code duplication

## 🔄 Data Flow

```
User Interaction → Component → Custom Hook → API Service → Backend
                                    ↓
UI Update ← State Update ← React Query ← HTTP Response ← API Response
```

### State Management Strategy

- **Server State** - TanStack Query for API data
- **Client State** - React Context for global state
- **Form State** - React Hook Form for form management
- **URL State** - React Router for navigation state

## 🎯 Development Guidelines

### Adding New Features

1. Create feature folder in `/src/features/`
2. Implement feature structure (api, components, pages, types)
3. Add routes to `AppRouter.tsx`
4. Create shared components if reusable
5. Add navigation items to sidebar

### Code Standards

- Use TypeScript for type safety
- Follow React best practices
- Implement proper error handling
- Write meaningful component names
- Use custom hooks for business logic
- Implement loading and error states

## 📝 API Integration

The application integrates with a RESTful API for:

- **Authentication** - User registration, login, OTP verification
- **Product Management** - CRUD operations for product inventory
- **Booking System** - Rental booking management
- **User Management** - Customer and admin operations
- **Banner Management** - Marketing content management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for efficient rental business management**
