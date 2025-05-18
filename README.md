# ARR Card Registration System

This is a demo application for the Romanian Road Authority (ARR) Card Registration System. The application provides a modern web interface for citizens to apply for various types of cards:

- Driver Tachograph Cards
- Company Tachograph Cards
- Workshop Tachograph Cards
- CPP (Professional Training Certificate) Cards
- ADR (Dangerous Goods) Cards

## Features

- Modern, responsive user interface
- Dynamic forms based on card type
- Document upload functionality
- Email validation
- Romanian language interface
- Mock data for demonstration purposes

## Technical Stack

- Angular 18
- Angular Material
- PrimeNG Components
- SCSS for styling
- Server-Side Rendering (SSR) enabled

## Development

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── core/           # Core module (services, guards, interceptors)
│   ├── shared/         # Shared module (common components, pipes, directives)
│   ├── features/       # Feature modules
│   │   ├── card-application/  # Card application feature
│   │   ├── operator/          # Operator interface
│   │   └── admin/            # Admin interface
│   └── models/         # Data models and interfaces
├── assets/
│   ├── i18n/          # Translation files
│   └── images/        # Static images
└── styles/            # Global styles
```

## Mock Data

This demo application uses mock data to simulate the backend functionality. The mock data is structured to represent:

- Card applications
- User profiles
- Document templates
- Agency information

## Design Guidelines

The application follows a clean, professional design suitable for a public institution:

- Color scheme based on official ARR colors
- Accessible design following WCAG guidelines
- Responsive layout for all device sizes
- Clear typography and visual hierarchy
- Consistent form design and validation
- Professional document upload interface

## License

This is a demo application created for demonstration purposes only.
