import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardType, CardTypeInfo } from '../../../models/card-types.enum';
import { MockDataService } from '../../../core/services/mock-data.service';

@Component({
  selector: 'app-card-type-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  template: `
    <div class="card-types-grid">
      @for (cardType of cardTypes; track cardType.type) {
        <mat-card class="card-type-card">
          <mat-card-content (click)="selectCardType(cardType)">
            <div class="card-type-icon">
              <mat-icon [fontIcon]="cardType.icon"></mat-icon>
            </div>
            <h3>{{ cardType.label }}</h3>
            <p>{{ cardType.description }}</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" (click)="selectCardType(cardType); $event.stopPropagation()">
              Selectează
              <mat-icon>arrow_forward</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .card-types-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }

    .card-type-card {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      height: 100%;
      display: flex;
      flex-direction: column;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }
    }

    .card-type-icon {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;

      mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        color: #1976d2;
      }
    }

    mat-card-content {
      flex: 1;
      text-align: center;

      h3 {
        margin: 0 0 0.5rem;
        color: #333;
        font-size: 1.2rem;
      }

      p {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
        line-height: 1.4;
      }
    }

    mat-card-actions {
      padding: 8px;
      display: flex;
      justify-content: center;

      button {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class CardTypeSelectorComponent implements OnInit {
  @Output() cardTypeSelected = new EventEmitter<CardTypeInfo>();
  
  cardTypes: CardTypeInfo[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.mockDataService.getCardTypes().subscribe(types => {
      this.cardTypes = types;
    });
  }

  selectCardType(cardType: CardTypeInfo): void {
    this.cardTypeSelected.emit(cardType);
  }
} 