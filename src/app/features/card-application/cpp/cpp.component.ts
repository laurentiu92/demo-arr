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
  selector: 'app-cpp',
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
      [initialCardType]="CardType.CPP"
      (cardTypeSelected)="onCardTypeSelected($event)">
      
      <!-- Additional CPP specific fields -->
      <div class="form-section" *ngIf="cppForm && selectedCardType?.type === CardType.CPP">
        <h2 class="form-title">Informații Certificat de Pregătire Profesională</h2>
        <p class="form-subtitle">Vă rugăm să completați informațiile specifice pentru certificatul de pregătire profesională</p>

        <form [formGroup]="cppForm">
          <div class="form-row">
            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Centrul de Pregătire</mat-label>
              <input matInput formControlName="trainingCenter" required>
              @if (cppForm.get('trainingCenter')?.hasError('required') && cppForm.get('trainingCenter')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Autorizație Centru de Pregătire</mat-label>
              <input matInput formControlName="trainingCenterAuthorization" required>
              @if (cppForm.get('trainingCenterAuthorization')?.hasError('required') && cppForm.get('trainingCenterAuthorization')?.touched) {
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
              @if (cppForm.get('trainingStartDate')?.hasError('required') && cppForm.get('trainingStartDate')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Data Finalizării Pregătirii</mat-label>
              <input matInput [matDatepicker]="endDatePicker" formControlName="trainingEndDate" required>
              <mat-datepicker-toggle matSuffix [for]="endDatePicker"></mat-datepicker-toggle>
              <mat-datepicker #endDatePicker></mat-datepicker>
              @if (cppForm.get('trainingEndDate')?.hasError('required') && cppForm.get('trainingEndDate')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Număr Certificat</mat-label>
              <input matInput formControlName="certificateNumber" required>
              @if (cppForm.get('certificateNumber')?.hasError('required') && cppForm.get('certificateNumber')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Data Emiterii Certificatului</mat-label>
              <input matInput [matDatepicker]="issueDatePicker" formControlName="certificateIssueDate" required>
              <mat-datepicker-toggle matSuffix [for]="issueDatePicker"></mat-datepicker-toggle>
              <mat-datepicker #issueDatePicker></mat-datepicker>
              @if (cppForm.get('certificateIssueDate')?.hasError('required') && cppForm.get('certificateIssueDate')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Categorii de Pregătire</mat-label>
              <mat-select formControlName="trainingCategories" multiple required>
                <mat-option value="D">Categoria D - Autobuz</mat-option>
                <mat-option value="D1">Categoria D1 - Microbus</mat-option>
                <mat-option value="D1E">Categoria D1E - Microbus cu Remorcă</mat-option>
                <mat-option value="DE">Categoria DE - Autobuz cu Remorcă</mat-option>
                <mat-option value="C">Categoria C - Autocamion</mat-option>
                <mat-option value="C1">Categoria C1 - Autocamion Ușor</mat-option>
                <mat-option value="C1E">Categoria C1E - Autocamion Ușor cu Remorcă</mat-option>
                <mat-option value="CE">Categoria CE - Autocamion cu Remorcă</mat-option>
              </mat-select>
              @if (cppForm.get('trainingCategories')?.hasError('required') && cppForm.get('trainingCategories')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Tipuri de Pregătire</mat-label>
              <mat-select formControlName="trainingTypes" multiple required>
                <mat-option value="INITIAL">Pregătire Inițială</mat-option>
                <mat-option value="PERIODIC">Pregătire Periodică</mat-option>
                <mat-option value="ACCELERATED">Pregătire Accelerată</mat-option>
                <mat-option value="SPECIALIZED">Pregătire Specializată</mat-option>
              </mat-select>
              @if (cppForm.get('trainingTypes')?.hasError('required') && cppForm.get('trainingTypes')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-checkbox formControlName="hasPreviousCertificate" color="primary">
              Am deținut anterior un certificat de pregătire profesională
            </mat-checkbox>
          </div>

          <div class="form-row" *ngIf="cppForm.get('hasPreviousCertificate')?.value">
            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Număr Certificat Anterior</mat-label>
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
              Declar că am citit și sunt de acord cu termenii și condițiile de utilizare a certificatului
            </mat-checkbox>
            @if (cppForm.get('acceptsTerms')?.hasError('required') && cppForm.get('acceptsTerms')?.touched) {
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
export class CppComponent extends BaseApplicationFormComponent implements OnInit {
  protected CardType = CardType;
  cppForm: FormGroup;

  constructor(
    protected override fb: FormBuilder,
    protected override mockDataService: MockDataService,
    protected override router: Router,
    protected override snackBar: MatSnackBar
  ) {
    super(fb, mockDataService, router, snackBar);
    
    // Initialize CPP-specific form
    this.cppForm = this.fb.group({
      trainingCenter: ['', Validators.required],
      trainingCenterAuthorization: ['', Validators.required],
      trainingStartDate: ['', Validators.required],
      trainingEndDate: ['', Validators.required],
      certificateNumber: ['', Validators.required],
      certificateIssueDate: ['', Validators.required],
      trainingCategories: [[], Validators.required],
      trainingTypes: [[], Validators.required],
      hasPreviousCertificate: [false],
      previousCertificateNumber: [''],
      previousCertificateExpiryDate: [''],
      acceptsTerms: [false, Validators.requiredTrue]
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // Add CPP form to the main form validation
    this.documentsForm.addControl('cppInfo', this.cppForm);
  }

  override updateFormValidation(): void {
    super.updateFormValidation();
    // Add any CPP-specific validation logic here
  }

  override onCardTypeSelected(cardType: CardType): void {
    super.onCardTypeSelected(cardType);
    if (cardType === CardType.CPP) {
      this.cppForm.enable();
    } else {
      this.cppForm.disable();
    }
  }

  override isFormValid(): boolean {
    return super.isFormValid() && 
           (this.selectedCardType?.type !== CardType.CPP || this.cppForm.valid);
  }

  override onSubmit(): void {
    if (this.isFormValid()) {
      const application = {
        ...this.cardTypeForm.value,
        personalInfo: this.personalInfoForm.value,
        cppInfo: this.cppForm.value,
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