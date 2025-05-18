import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BaseApplicationFormComponent } from '../../../shared/components/base-application-form/base-application-form.component';
import { CardType } from '../../../models/card-types.enum';
import { MockDataService } from '../../../core/services/mock-data.service';

@Component({
  selector: 'app-adr',
  standalone: true,
  imports: [
    BaseApplicationFormComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  template: `
    <app-base-application-form
      [initialCardType]="CardType.ADR"
      (cardTypeSelected)="onCardTypeSelected($event)">
      
      <!-- Additional ADR specific fields -->
      <div class="form-section" *ngIf="adrForm && selectedCardType?.type === CardType.ADR">
        <h2 class="form-title">Informații Certificat ADR</h2>
        <p class="form-subtitle">Vă rugăm să completați informațiile specifice pentru certificatul de transport mărfuri periculoase</p>

        <form [formGroup]="adrForm">
          <div class="form-row">
            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Centrul de Pregătire ADR</mat-label>
              <input matInput formControlName="trainingCenter" required>
              @if (adrForm.get('trainingCenter')?.hasError('required') && adrForm.get('trainingCenter')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Autorizație Centru de Pregătire ADR</mat-label>
              <input matInput formControlName="trainingCenterAuthorization" required>
              @if (adrForm.get('trainingCenterAuthorization')?.hasError('required') && adrForm.get('trainingCenterAuthorization')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Data Începerii Pregătirii</mat-label>
              <input matInput [matDatepicker]="startDatePicker" formControlName="trainingStartDate" required>
              <mat-datepicker-toggle matSuffix [for]="startDatePicker"></mat-datepicker-toggle>
              <mat-datepicker #startDatePicker></mat-datepicker>
              @if (adrForm.get('trainingStartDate')?.hasError('required') && adrForm.get('trainingStartDate')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Data Finalizării Pregătirii</mat-label>
              <input matInput [matDatepicker]="endDatePicker" formControlName="trainingEndDate" required>
              <mat-datepicker-toggle matSuffix [for]="endDatePicker"></mat-datepicker-toggle>
              <mat-datepicker #endDatePicker></mat-datepicker>
              @if (adrForm.get('trainingEndDate')?.hasError('required') && adrForm.get('trainingEndDate')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Număr Certificat ADR</mat-label>
              <input matInput formControlName="certificateNumber" required>
              @if (adrForm.get('certificateNumber')?.hasError('required') && adrForm.get('certificateNumber')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Data Emiterii Certificatului</mat-label>
              <input matInput [matDatepicker]="issueDatePicker" formControlName="certificateIssueDate" required>
              <mat-datepicker-toggle matSuffix [for]="issueDatePicker"></mat-datepicker-toggle>
              <mat-datepicker #issueDatePicker></mat-datepicker>
              @if (adrForm.get('certificateIssueDate')?.hasError('required') && adrForm.get('certificateIssueDate')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Clase de Mărfuri Periculoase</mat-label>
              <mat-select formControlName="dangerousGoodsClasses" multiple required>
                <mat-option value="1">Clasa 1 - Explozivi</mat-option>
                <mat-option value="2">Clasa 2 - Gaze</mat-option>
                <mat-option value="3">Clasa 3 - Lichide Inflamabile</mat-option>
                <mat-option value="4.1">Clasa 4.1 - Solide Inflamabile</mat-option>
                <mat-option value="4.2">Clasa 4.2 - Substanțe Supuse la Autoaprindere</mat-option>
                <mat-option value="4.3">Clasa 4.3 - Substanțe care în Contact cu Apa Degajă Gaze Inflamabile</mat-option>
                <mat-option value="5.1">Clasa 5.1 - Substanțe Oxidante</mat-option>
                <mat-option value="5.2">Clasa 5.2 - Peroxizi Organici</mat-option>
                <mat-option value="6.1">Clasa 6.1 - Substanțe Toxice</mat-option>
                <mat-option value="6.2">Clasa 6.2 - Substanțe Infecțioase</mat-option>
                <mat-option value="7">Clasa 7 - Materiale Radioactive</mat-option>
                <mat-option value="8">Clasa 8 - Substanțe Corozive</mat-option>
                <mat-option value="9">Clasa 9 - Diverse Substanțe și Obiecte Periculoase</mat-option>
              </mat-select>
              @if (adrForm.get('dangerousGoodsClasses')?.hasError('required') && adrForm.get('dangerousGoodsClasses')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Tipuri de Transport</mat-label>
              <mat-select formControlName="transportTypes" multiple required>
                <mat-option value="TANK">Transport în Cisternă</mat-option>
                <mat-option value="EXPLOSIVES">Transport Explozivi</mat-option>
                <mat-option value="RADIOACTIVE">Transport Materiale Radioactive</mat-option>
                <mat-option value="GENERAL">Transport General</mat-option>
              </mat-select>
              @if (adrForm.get('transportTypes')?.hasError('required') && adrForm.get('transportTypes')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Tipuri de Pregătire</mat-label>
              <mat-select formControlName="trainingTypes" multiple required>
                <mat-option value="BASIC">Pregătire de Bază</mat-option>
                <mat-option value="SPECIALIZED">Pregătire Specializată</mat-option>
                <mat-option value="TANK">Pregătire pentru Transport în Cisternă</mat-option>
                <mat-option value="CLASS1">Pregătire pentru Clasa 1 (Explozivi)</mat-option>
                <mat-option value="CLASS7">Pregătire pentru Clasa 7 (Radioactive)</mat-option>
              </mat-select>
              @if (adrForm.get('trainingTypes')?.hasError('required') && adrForm.get('trainingTypes')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-checkbox formControlName="hasPreviousCertificate" color="primary">
              Am deținut anterior un certificat ADR
            </mat-checkbox>
          </div>

          <div class="form-row" *ngIf="adrForm.get('hasPreviousCertificate')?.value">
            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Număr Certificat ADR Anterior</mat-label>
              <input matInput formControlName="previousCertificateNumber">
            </mat-form-field>

            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Data Expirării Certificatului Anterior</mat-label>
              <input matInput [matDatepicker]="previousExpiryPicker" formControlName="previousCertificateExpiryDate">
              <mat-datepicker-toggle matSuffix [for]="previousExpiryPicker"></mat-datepicker-toggle>
              <mat-datepicker #previousExpiryPicker></mat-datepicker>
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-checkbox formControlName="acceptsTerms" color="primary" required>
              Declar că am citit și sunt de acord cu termenii și condițiile de utilizare a certificatului ADR
            </mat-checkbox>
            @if (adrForm.get('acceptsTerms')?.hasError('required') && adrForm.get('acceptsTerms')?.touched) {
              <mat-error>Trebuie să fiți de acord cu termenii și condițiile</mat-error>
            }
          </div>
        </form>
      </div>
    </app-base-application-form>
  `,
  styles: [`
    :host {
      display: block;
    }

    .form-section {
      margin-top: 2rem;
    }

    .form-row {
      margin-bottom: 1rem;
    }

    mat-checkbox {
      margin: 1rem 0;
    }

    @media (max-width: 600px) {
      .form-row {
        flex-direction: column;
      }

      .half-width {
        width: 100%;
      }
    }
  `]
})
export class AdrComponent extends BaseApplicationFormComponent implements OnInit {
  protected CardType = CardType;
  adrForm: FormGroup;

  constructor(
    protected override fb: FormBuilder,
    protected override mockDataService: MockDataService,
    protected override router: Router,
    protected override snackBar: MatSnackBar
  ) {
    super(fb, mockDataService, router, snackBar);
    
    // Initialize ADR-specific form
    this.adrForm = this.fb.group({
      trainingCenter: ['', Validators.required],
      trainingCenterAuthorization: ['', Validators.required],
      trainingStartDate: ['', Validators.required],
      trainingEndDate: ['', Validators.required],
      certificateNumber: ['', Validators.required],
      certificateIssueDate: ['', Validators.required],
      dangerousGoodsClasses: [[], Validators.required],
      transportTypes: [[], Validators.required],
      trainingTypes: [[], Validators.required],
      hasPreviousCertificate: [false],
      previousCertificateNumber: [''],
      previousCertificateExpiryDate: [''],
      acceptsTerms: [false, Validators.requiredTrue]
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // Add ADR form to the main form validation
    this.documentsForm.addControl('adrInfo', this.adrForm);
  }

  override updateFormValidation(): void {
    super.updateFormValidation();
    // Add any ADR-specific validation logic here
  }

  override onCardTypeSelected(cardType: CardType): void {
    super.onCardTypeSelected(cardType);
    if (cardType === CardType.ADR) {
      this.adrForm.enable();
    } else {
      this.adrForm.disable();
    }
  }

  override isFormValid(): boolean {
    return super.isFormValid() && 
           (this.selectedCardType?.type !== CardType.ADR || this.adrForm.valid);
  }

  override onSubmit(): void {
    if (this.isFormValid()) {
      const application = {
        ...this.cardTypeForm.value,
        personalInfo: this.personalInfoForm.value,
        adrInfo: this.adrForm.value,
        // Add document information here
      };

      // Call the mock service to submit the application
      this.mockDataService.createApplication(application).subscribe({
        next: (result) => {
          this.snackBar.open('Cererea a fost trimisă cu succes!', 'OK', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.snackBar.open('A apărut o eroare la trimiterea cererii. Vă rugăm să încercați din nou.', 'OK', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      });
    }
  }
} 