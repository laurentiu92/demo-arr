import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CardTypeSelectorComponent } from '../../../shared/components/card-type-selector/card-type-selector.component';
import { CardTypeInfo } from '../../../models/card-types.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CardTypeSelectorComponent
  ],
  template: `
    <mat-toolbar color="primary" class="app-header">
      <img src="assets/images/arr-logo.svg" alt="ARR Logo" class="logo" />
      <span class="spacer"></span>
      <button mat-button>
        <mat-icon>help_outline</mat-icon>
        Ajutor
      </button>
      <button mat-button>
        <mat-icon>language</mat-icon>
        RO
      </button>
    </mat-toolbar>

    <div class="home-container">
      <div class="welcome-section">
        <h1>Bine ați venit la Sistemul de Înregistrare Carduri ARR</h1>
        <p class="subtitle">
          Selectați tipul de card pentru care doriți să aplicați
        </p>
      </div>

      <app-card-type-selector
        (cardTypeSelected)="onCardTypeSelected($event)"
      ></app-card-type-selector>

      <footer class="app-footer">
        <p>© 2024 Autoritatea Rutieră Română. Toate drepturile rezervate.</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .logo {
      height: 40px;
      margin-right: 16px;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .home-container {
      padding-top: 64px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: var(--arr-gray-100);
    }

    .welcome-section {
      text-align: center;
      padding: 2rem 1rem;
      background-color: white;
      box-shadow: var(--arr-shadow-sm);

      h1 {
        margin: 0;
        color: var(--arr-primary);
        font-size: 2rem;
        font-weight: 500;
      }

      .subtitle {
        margin: 1rem 0 0;
        color: var(--arr-gray-700);
        font-size: 1.1rem;
      }
    }

    .app-footer {
      margin-top: auto;
      padding: 1rem;
      text-align: center;
      background-color: white;
      color: var(--arr-gray-600);
      font-size: 0.9rem;
      box-shadow: 0 -2px 4px rgba(0,0,0,0.05);
    }

    @media (max-width: 600px) {
      .welcome-section {
        h1 {
          font-size: 1.5rem;
        }

        .subtitle {
          font-size: 1rem;
        }
      }
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  onCardTypeSelected(cardType: CardTypeInfo): void {
    // Navigate to the application form for the selected card type
    this.router.navigate(['/apply', cardType.type.toLowerCase()]);
  }
} 