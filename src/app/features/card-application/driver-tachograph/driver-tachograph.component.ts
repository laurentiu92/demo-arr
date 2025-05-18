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
import { MatDividerModule } from '@angular/material/divider';

import { BaseApplicationFormComponent } from '../../../shared/components/base-application-form/base-application-form.component';
import { CardType } from '../../../models/card-types.enum';
import { MockDataService } from '../../../core/services/mock-data.service';

@Component({
  selector: 'app-driver-tachograph',
  standalone: true,
  imports: [
    BaseApplicationFormComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <app-base-application-form
      [initialCardType]="CardType.DRIVER_TACHOGRAPH"
      (cardTypeSelected)="onCardTypeSelected($event)">
      
      <!-- Additional Driver Tachograph specific fields -->
      <div class="form-section" *ngIf="driverForm && selectedCardType?.type === CardType.DRIVER_TACHOGRAPH">
        <h2 class="form-title">Informații Șofer</h2>
        <p class="form-subtitle">Vă rugăm să completați informațiile despre permisul de conducere și cardul anterior (dacă este cazul)</p>

        <form [formGroup]="driverForm">
          <!-- Driving License Information -->
          <h3 class="form-subtitle">Permis de Conducere</h3>
          <div class="form-row">
            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Număr Permis de Conducere</mat-label>
              <input matInput formControlName="licenseNumber" required>
              @if (driverForm.get('licenseNumber')?.hasError('required') && driverForm.get('licenseNumber')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Serie Permis de Conducere</mat-label>
              <input matInput formControlName="licenseSeries" required>
              @if (driverForm.get('licenseSeries')?.hasError('required') && driverForm.get('licenseSeries')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Data Emiterii Permisului</mat-label>
              <input matInput [matDatepicker]="licenseIssueDatePicker" formControlName="licenseIssueDate" required>
              <mat-datepicker-toggle matSuffix [for]="licenseIssueDatePicker"></mat-datepicker-toggle>
              <mat-datepicker #licenseIssueDatePicker></mat-datepicker>
              @if (driverForm.get('licenseIssueDate')?.hasError('required') && driverForm.get('licenseIssueDate')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
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
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Autoritatea Emitentă</mat-label>
              <input matInput formControlName="licenseIssuingAuthority" required>
              @if (driverForm.get('licenseIssuingAuthority')?.hasError('required') && driverForm.get('licenseIssuingAuthority')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Țara Emitentă</mat-label>
              <input matInput formControlName="licenseIssuingCountry" required>
              @if (driverForm.get('licenseIssuingCountry')?.hasError('required') && driverForm.get('licenseIssuingCountry')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Categorii Permis de Conducere</mat-label>
              <mat-select formControlName="licenseCategories" multiple required>
                <mat-option value="A">A - Motociclete</mat-option>
                <mat-option value="B">B - Autoturisme</mat-option>
                <mat-option value="C">C - Camioane</mat-option>
                <mat-option value="D">D - Autobuze</mat-option>
                <mat-option value="E">E - Remorci</mat-option>
                <mat-option value="CE">CE - Camioane cu remorcă</mat-option>
                <mat-option value="DE">DE - Autobuze cu remorcă</mat-option>
              </mat-select>
              @if (driverForm.get('licenseCategories')?.hasError('required') && driverForm.get('licenseCategories')?.touched) {
                <mat-error>Acest câmp este obligatoriu</mat-error>
              }
            </mat-form-field>
          </div>

          <mat-divider class="my-4"></mat-divider>

          <!-- Previous Card Information -->
          <h3 class="form-subtitle">Informații Card Anterior</h3>
          <div class="form-row">
            <mat-checkbox formControlName="hasPreviousCard" color="primary">
              Am deținut anterior un card tahograf
            </mat-checkbox>
          </div>

          @if (driverForm.get('hasPreviousCard')?.value) {
            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Număr Card Anterior</mat-label>
                <input matInput formControlName="previousCardNumber">
                @if (driverForm.get('previousCardNumber')?.hasError('required') && driverForm.get('previousCardNumber')?.touched) {
                  <mat-error>Acest câmp este obligatoriu</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Data Expirării Cardului Anterior</mat-label>
                <input matInput [matDatepicker]="previousCardExpiryPicker" formControlName="previousCardExpiryDate">
                <mat-datepicker-toggle matSuffix [for]="previousCardExpiryPicker"></mat-datepicker-toggle>
                <mat-datepicker #previousCardExpiryPicker></mat-datepicker>
                @if (driverForm.get('previousCardExpiryDate')?.hasError('required') && driverForm.get('previousCardExpiryDate')?.touched) {
                  <mat-error>Acest câmp este obligatoriu</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Țara Emitentă Card Anterior</mat-label>
                <input matInput formControlName="previousCardIssuingCountry">
                @if (driverForm.get('previousCardIssuingCountry')?.hasError('required') && driverForm.get('previousCardIssuingCountry')?.touched) {
                  <mat-error>Acest câmp este obligatoriu</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Autoritatea Emitentă Card Anterior</mat-label>
                <input matInput formControlName="previousCardIssuingAuthority">
                @if (driverForm.get('previousCardIssuingAuthority')?.hasError('required') && driverForm.get('previousCardIssuingAuthority')?.touched) {
                  <mat-error>Acest câmp este obligatoriu</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Motivul Schimbării Cardului</mat-label>
                <mat-select formControlName="cardChangeReason">
                  <mat-option value="EXPIRED">Expirat</mat-option>
                  <mat-option value="LOST">Pierdut</mat-option>
                  <mat-option value="STOLEN">Furat</mat-option>
                  <mat-option value="DAMAGED">Defect</mat-option>
                  <mat-option value="NAME_CHANGE">Schimbare nume</mat-option>
                  <mat-option value="ADDRESS_CHANGE">Schimbare adresă</mat-option>
                  <mat-option value="PHOTO_CHANGE">Schimbare fotografie</mat-option>
                  <mat-option value="LICENSE_CHANGE">Schimbare permis</mat-option>
                  <mat-option value="WITHDRAWN">Retras</mat-option>
                </mat-select>
                @if (driverForm.get('cardChangeReason')?.hasError('required') && driverForm.get('cardChangeReason')?.touched) {
                  <mat-error>Acest câmp este obligatoriu</mat-error>
                }
              </mat-form-field>
            </div>

            @if (driverForm.get('cardChangeReason')?.value === 'NAME_CHANGE') {
              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Nume Anterior</mat-label>
                  <input matInput formControlName="previousName">
                  @if (driverForm.get('previousName')?.hasError('required') && driverForm.get('previousName')?.touched) {
                    <mat-error>Acest câmp este obligatoriu</mat-error>
                  }
                </mat-form-field>
              </div>
            }

            @if (driverForm.get('cardChangeReason')?.value === 'ADDRESS_CHANGE') {
              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Adresa Anterioară</mat-label>
                  <input matInput formControlName="previousAddress">
                  @if (driverForm.get('previousAddress')?.hasError('required') && driverForm.get('previousAddress')?.touched) {
                    <mat-error>Acest câmp este obligatoriu</mat-error>
                  }
                </mat-form-field>
              </div>
            }
          }

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

    .my-4 {
      margin: 2rem 0;
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
      licenseNumber: ['', Validators.required],
      licenseSeries: ['', Validators.required],
      licenseIssueDate: ['', Validators.required],
      licenseExpiryDate: ['', Validators.required],
      licenseIssuingAuthority: ['', Validators.required],
      licenseIssuingCountry: ['', Validators.required],
      licenseCategories: [[], Validators.required],
      hasPreviousCard: [false],
      previousCardNumber: [''],
      previousCardExpiryDate: [''],
      previousCardIssuingCountry: [''],
      previousCardIssuingAuthority: [''],
      cardChangeReason: [''],
      previousName: [''],
      previousAddress: [''],
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
      const previousCardControls = [
        'previousCardNumber',
        'previousCardExpiryDate',
        'previousCardIssuingCountry',
        'previousCardIssuingAuthority',
        'cardChangeReason'
      ];

      previousCardControls.forEach(controlName => {
        const control = this.driverForm.get(controlName);
        if (hasPrevious) {
          control?.setValidators(Validators.required);
        } else {
          control?.clearValidators();
        }
        control?.updateValueAndValidity();
      });

      // Reset previous card fields when hasPreviousCard is false
      if (!hasPrevious) {
        this.driverForm.patchValue({
          previousCardNumber: '',
          previousCardExpiryDate: '',
          previousCardIssuingCountry: '',
          previousCardIssuingAuthority: '',
          cardChangeReason: '',
          previousName: '',
          previousAddress: ''
        });
      }
    });

    // Add validation for previous name and address based on cardChangeReason
    this.driverForm.get('cardChangeReason')?.valueChanges.subscribe(reason => {
      const previousNameControl = this.driverForm.get('previousName');
      const previousAddressControl = this.driverForm.get('previousAddress');

      if (reason === 'NAME_CHANGE') {
        previousNameControl?.setValidators(Validators.required);
        previousAddressControl?.clearValidators();
      } else if (reason === 'ADDRESS_CHANGE') {
        previousNameControl?.clearValidators();
        previousAddressControl?.setValidators(Validators.required);
      } else {
        previousNameControl?.clearValidators();
        previousAddressControl?.clearValidators();
      }

      previousNameControl?.updateValueAndValidity();
      previousAddressControl?.updateValueAndValidity();
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
    return super.isFormValid() && this.driverForm.valid;
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