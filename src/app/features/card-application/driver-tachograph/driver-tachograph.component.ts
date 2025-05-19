import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { BaseApplicationFormComponent } from '../../../shared/components/base-application-form/base-application-form.component';
import { CardType } from '../../../models/card-types.enum';
import { MockDataService } from '../../../core/services/mock-data.service';

@Component({
  selector: 'app-driver-tachograph',
  standalone: true,
  imports: [
    BaseApplicationFormComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  template: `
    <app-base-application-form
      [initialCardType]="CardType.DRIVER_TACHOGRAPH"
      (cardTypeSelected)="onCardTypeSelected($event)">
      
      <!-- Additional Driver Tachograph specific fields -->
      <div class="form-section" *ngIf="driverForm && selectedCardType?.type === CardType.DRIVER_TACHOGRAPH">
        <h2 class="form-title">Informații Șofer</h2>
        <p class="form-subtitle">Vă rugăm să completați informațiile specifice pentru cardul de șofer</p>

        <form [formGroup]="driverForm">
          <!-- License Information -->
          <h3 class="form-subtitle">Informații Permis de Conducere</h3>
          <div class="form-row">
            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Număr Permis de Conducere</mat-label>
              <input matInput formControlName="licenseNumber" required
                     pattern="^[A-Z0-9]{8,}$"
                     placeholder="Ex: AB123456">
              @if (driverForm.get('licenseNumber')?.hasError('required') && driverForm.get('licenseNumber')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
              @if (driverForm.get('licenseNumber')?.hasError('pattern') && driverForm.get('licenseNumber')?.touched) {
                <mat-error>Format invalid. Trebuie să conțină minim 8 caractere (litere și cifre)</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Categorii Permis</mat-label>
              <mat-select formControlName="licenseCategories" multiple required>
                <mat-option value="A">A - Motociclete</mat-option>
                <mat-option value="B">B - Autoturisme</mat-option>
                <mat-option value="C">C - Autocamioane</mat-option>
                <mat-option value="D">D - Autobuze</mat-option>
                <mat-option value="E">E - Remorci</mat-option>
                <mat-option value="F">F - Tractoare</mat-option>
                <mat-option value="G">G - Mașini agricole</mat-option>
              </mat-select>
              @if (driverForm.get('licenseCategories')?.hasError('required') && driverForm.get('licenseCategories')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
              @if (driverForm.get('licenseCategories')?.hasError('minLength') && driverForm.get('licenseCategories')?.touched) {
                <mat-error>Trebuie să selectați cel puțin o categorie</mat-error>
              }
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Data Emiterii Permisului</mat-label>
              <input matInput [matDatepicker]="licenseDatePicker" formControlName="licenseIssueDate" required>
              <mat-datepicker-toggle matSuffix [for]="licenseDatePicker"></mat-datepicker-toggle>
              <mat-datepicker #licenseDatePicker></mat-datepicker>
              @if (driverForm.get('licenseIssueDate')?.hasError('required') && driverForm.get('licenseIssueDate')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
              @if (driverForm.get('licenseIssueDate')?.hasError('futureDate') && driverForm.get('licenseIssueDate')?.touched) {
                <mat-error>Data emiterii nu poate fi în viitor</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Data Expirării Permisului</mat-label>
              <input matInput [matDatepicker]="licenseExpiryDatePicker" formControlName="licenseExpiryDate" required>
              <mat-datepicker-toggle matSuffix [for]="licenseExpiryDatePicker"></mat-datepicker-toggle>
              <mat-datepicker #licenseExpiryDatePicker></mat-datepicker>
              @if (driverForm.get('licenseExpiryDate')?.hasError('required') && driverForm.get('licenseExpiryDate')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
              @if (driverForm.get('licenseExpiryDate')?.hasError('pastDate') && driverForm.get('licenseExpiryDate')?.touched) {
                <mat-error>Data expirării trebuie să fie în viitor</mat-error>
              }
            </mat-form-field>
          </div>

          <!-- Employer Information -->
          <h3 class="form-subtitle">Informații Angajator</h3>
          <div class="form-row">
            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Codul Unic de Înregistrare (CUI) Angajator</mat-label>
              <input matInput formControlName="employerCui" required
                     pattern="^RO[0-9]{2,10}$"
                     placeholder="Ex: RO12345678">
              @if (driverForm.get('employerCui')?.hasError('required') && driverForm.get('employerCui')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
              @if (driverForm.get('employerCui')?.hasError('pattern') && driverForm.get('employerCui')?.touched) {
                <mat-error>Format invalid. Trebuie să înceapă cu RO urmat de 2-10 cifre</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Denumire Angajator</mat-label>
              <input matInput formControlName="employerName" required
                     minlength="3"
                     maxlength="100">
              @if (driverForm.get('employerName')?.hasError('required') && driverForm.get('employerName')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
              @if (driverForm.get('employerName')?.hasError('minlength') && driverForm.get('employerName')?.touched) {
                <mat-error>Denumirea trebuie să aibă cel puțin 3 caractere</mat-error>
              }
              @if (driverForm.get('employerName')?.hasError('maxlength') && driverForm.get('employerName')?.touched) {
                <mat-error>Denumirea nu poate depăși 100 de caractere</mat-error>
              }
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Adresa Angajator</mat-label>
              <input matInput formControlName="employerAddress" required
                     minlength="5"
                     maxlength="200">
              @if (driverForm.get('employerAddress')?.hasError('required') && driverForm.get('employerAddress')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
              @if (driverForm.get('employerAddress')?.hasError('minlength') && driverForm.get('employerAddress')?.touched) {
                <mat-error>Adresa trebuie să aibă cel puțin 5 caractere</mat-error>
              }
              @if (driverForm.get('employerAddress')?.hasError('maxlength') && driverForm.get('employerAddress')?.touched) {
                <mat-error>Adresa nu poate depăși 200 de caractere</mat-error>
              }
            </mat-form-field>
          </div>

          <!-- Previous Card Information -->
          <h3 class="form-subtitle">Informații Card Anterior</h3>
          <div class="form-row">
            <mat-checkbox formControlName="hasPreviousCard" color="primary">
              Am deținut anterior un card de conducător
            </mat-checkbox>
          </div>

          <div class="form-row" *ngIf="driverForm.get('hasPreviousCard')?.value">
            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Număr Card Anterior</mat-label>
              <input matInput formControlName="previousCardNumber"
                     pattern="^[A-Z0-9]{8,}$"
                     placeholder="Ex: TC12345678">
              @if (driverForm.get('previousCardNumber')?.hasError('pattern') && driverForm.get('previousCardNumber')?.touched) {
                <mat-error>Format invalid. Trebuie să conțină minim 8 caractere (litere și cifre)</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Data Expirării Cardului Anterior</mat-label>
              <input matInput [matDatepicker]="previousCardExpiryPicker" formControlName="previousCardExpiryDate">
              <mat-datepicker-toggle matSuffix [for]="previousCardExpiryPicker"></mat-datepicker-toggle>
              <mat-datepicker #previousCardExpiryPicker></mat-datepicker>
              @if (driverForm.get('previousCardExpiryDate')?.hasError('futureDate') && driverForm.get('previousCardExpiryDate')?.touched) {
                <mat-error>Data expirării trebuie să fie în trecut</mat-error>
              }
            </mat-form-field>
          </div>

          <!-- Terms and Conditions -->
          <div class="form-row">
            <mat-checkbox formControlName="acceptsTerms" color="primary" required>
              Declar că am citit și sunt de acord cu termenii și condițiile de utilizare a cardului
            </mat-checkbox>
            @if (driverForm.get('acceptsTerms')?.hasError('required') && driverForm.get('acceptsTerms')?.touched) {
              <mat-error>Trebuie să fiți de acord cu termenii și condițiile</mat-error>
            }
          </div>

          <!-- Additional Declarations -->
          <div class="form-row">
            <mat-checkbox formControlName="declaresAccuracy" color="primary" required>
              Declar pe propria răspundere că informațiile furnizate sunt complete și adevărate
            </mat-checkbox>
            @if (driverForm.get('declaresAccuracy')?.hasError('required') && driverForm.get('declaresAccuracy')?.touched) {
              <mat-error>Trebuie să confirmați acuratețea informațiilor</mat-error>
            }
          </div>
        </form>

        <div class="step-actions">
          <button mat-button (click)="onSubmit()" [disabled]="!isFormValid()" color="primary">
            Trimite Cererea
            <mat-icon>send</mat-icon>
          </button>
        </div>
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

    .form-subtitle {
      color: var(--arr-gray-700);
      margin: 1.5rem 0 1rem;
      font-size: 1.1rem;
      font-weight: 500;
    }

    mat-checkbox {
      margin: 1rem 0;
      display: block;
    }

    @media (max-width: 600px) {
      .form-row {
        flex-direction: column;
      }

      .half-width {
        width: 100%;
      }
    }

    .step-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid var(--arr-gray-200);
    }

    button[mat-button] {
      min-width: 200px;
    }
  `]
})
export class DriverTachographComponent extends BaseApplicationFormComponent implements OnInit {
  protected CardType = CardType;
  driverForm: FormGroup;

  constructor(
    protected override fb: FormBuilder,
    protected override mockDataService: MockDataService,
    protected override router: Router,
    protected override snackBar: MatSnackBar
  ) {
    super(fb, mockDataService, router, snackBar);
    
    // Initialize driver-specific form with enhanced validations
    this.driverForm = this.fb.group({
      licenseNumber: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{8,}$')]],
      licenseCategories: [[], [Validators.required, Validators.minLength(1)]],
      licenseIssueDate: ['', [Validators.required, this.futureDateValidator()]],
      licenseExpiryDate: ['', [Validators.required, this.pastDateValidator()]],
      employerCui: ['', [Validators.required, Validators.pattern('^RO[0-9]{2,10}$')]],
      employerName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      employerAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      hasPreviousCard: [false],
      previousCardNumber: ['', [Validators.pattern('^[A-Z0-9]{8,}$')]],
      previousCardExpiryDate: ['', this.futureDateValidator()],
      acceptsTerms: [false, Validators.requiredTrue],
      declaresAccuracy: [false, Validators.requiredTrue]
    });

    // Add cross-field validation for license dates
    this.driverForm.setValidators([
      this.licenseDatesValidator()
    ]);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // Add driver form to the main form validation
    this.documentsForm.addControl('driverInfo', this.driverForm);

    // Subscribe to card type changes
    this.cardTypeForm.get('cardType')?.valueChanges.subscribe(cardType => {
      if (cardType === CardType.DRIVER_TACHOGRAPH) {
        this.driverForm.enable();
      } else {
        this.driverForm.disable();
      }
    });

    // Subscribe to hasPreviousCard changes to update validation
    this.driverForm.get('hasPreviousCard')?.valueChanges.subscribe(hasPrevious => {
      const previousCardNumber = this.driverForm.get('previousCardNumber');
      const previousCardExpiryDate = this.driverForm.get('previousCardExpiryDate');

      if (hasPrevious) {
        previousCardNumber?.setValidators([Validators.required, Validators.pattern('^[A-Z0-9]{8,}$')]);
        previousCardExpiryDate?.setValidators([Validators.required, this.futureDateValidator()]);
      } else {
        previousCardNumber?.clearValidators();
        previousCardExpiryDate?.clearValidators();
      }

      previousCardNumber?.updateValueAndValidity();
      previousCardExpiryDate?.updateValueAndValidity();
    });
  }

  override onCardTypeSelected(cardType: CardType): void {
    super.onCardTypeSelected(cardType);
    if (cardType === CardType.DRIVER_TACHOGRAPH) {
      this.driverForm.enable();
    } else {
      this.driverForm.disable();
    }
  }

  override isFormValid(): boolean {
    return super.isFormValid() && 
           (this.selectedCardType?.type !== CardType.DRIVER_TACHOGRAPH || this.driverForm.valid);
  }

  // Custom validators
  private futureDateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const date = new Date(control.value);
      return date > new Date() ? { futureDate: true } : null;
    };
  }

  private pastDateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const date = new Date(control.value);
      return date < new Date() ? { pastDate: true } : null;
    };
  }

  private licenseDatesValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const issueDate = group.get('licenseIssueDate')?.value;
      const expiryDate = group.get('licenseExpiryDate')?.value;

      if (!issueDate || !expiryDate) return null;

      const issue = new Date(issueDate);
      const expiry = new Date(expiryDate);

      return issue > expiry ? { invalidDates: true } : null;
    };
  }

  override updateFormValidation(): void {
    super.updateFormValidation();
    // Add any driver-specific validation logic here
  }

  override onSubmit(): void {
    if (this.isFormValid()) {
      const application = {
        ...this.cardTypeForm.value,
        personalInfo: this.personalInfoForm.value,
        driverInfo: this.driverForm.value,
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