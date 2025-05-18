# ARR Card Registration System

Sistemul de Înregistrare Carduri ARR - Aplicație pentru înregistrarea și gestionarea cardurilor tahograf și certificatelor de pregătire profesională.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Deployment

The application is automatically deployed to GitHub Pages at https://laurentiu92.github.io/demo-arr/ when changes are pushed to the main branch.

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. The build output will be in the `docs` folder

3. Push the changes to the `gh-pages` branch

## Features

- Card Tahograf Șofer
- Card Tahograf Companie
- Card Tahograf Atelier
- Certificat de Pregătire Profesională (CPP)
- Certificat ADR

## Technologies

- Angular 17
- Angular Material
- TypeScript
- SCSS

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
