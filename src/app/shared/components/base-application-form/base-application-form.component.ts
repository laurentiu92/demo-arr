import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CardType, CardTypeInfo } from '../../../models/card-types.enum';
import { CardApplication, PersonalInfo, Address } from '../../../models/card-application.model';
import { MockDataService } from '../../../core/services/mock-data.service';

@Component({
  selector: 'app-base-application-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  template: `
    <div class="form-container">
      <mat-stepper [linear]="true" #stepper>
        <!-- Step 1: Card Type Selection -->
        <mat-step [stepControl]="cardTypeForm">
          <ng-template matStepLabel>Selectare Tip Card</ng-template>
          <form [formGroup]="cardTypeForm">
            <div class="form-section">
              <h2 class="form-title">Selectare Tip Card</h2>
              <p class="form-subtitle">Vă rugăm să selectați tipul de card pentru care doriți să aplicați</p>
              
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Tip Card</mat-label>
                <input matInput [value]="selectedCardType?.label" readonly>
                <mat-icon matSuffix>lock</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Tip Cerere</mat-label>
                <mat-select formControlName="requestType">
                  <mat-option value="NEW">Card Nou</mat-option>
                  <mat-option value="RENEWAL">Reînnoire</mat-option>
                  <mat-option value="REPLACEMENT">Înlocuire</mat-option>
                  <mat-option value="CHANGE">Modificare</mat-option>
                  @if (selectedCardType?.type === 'ADR') {
                    <mat-option value="EXTENSION">Extindere Valabilitate</mat-option>
                  }
                </mat-select>
                @if (cardTypeForm.get('requestType')?.hasError('required') && cardTypeForm.get('requestType')?.touched) {
                  <mat-error>Acest câmp este obligatoriu</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Agenție de Livrare</mat-label>
                <mat-select formControlName="agencyId">
                  @for (agency of agencies; track agency.id) {
                    <mat-option [value]="agency.id">
                      {{ agency.name }}
                    </mat-option>
                  }
                </mat-select>
                @if (cardTypeForm.get('agencyId')?.hasError('required') && cardTypeForm.get('agencyId')?.touched) {
                  <mat-error>Acest câmp este obligatoriu</mat-error>
                }
              </mat-form-field>
            </div>
          </form>
          <div class="step-actions">
            <button mat-button matStepperNext [disabled]="!cardTypeForm.valid">
              Următorul Pas
              <mat-icon>arrow_forward</mat-icon>
            </button>
          </div>
        </mat-step>

        <!-- Step 2: Personal Information -->
        <mat-step [stepControl]="personalInfoForm">
          <ng-template matStepLabel>Date Personale</ng-template>
          <form [formGroup]="personalInfoForm">
            <div class="form-section">
              <h2 class="form-title">Date Personale</h2>
              <p class="form-subtitle">Vă rugăm să completați datele personale</p>
              
              <!-- Personal Info Form Fields -->
              <div class="form-row">
                <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Prenume</mat-label>
                  <input matInput formControlName="firstName" required>
                  @if (personalInfoForm.get('firstName')?.hasError('required') && personalInfoForm.get('firstName')?.touched) {
                    <mat-error>Acest câmp este obligatoriu</mat-error>
                  }
                </mat-form-field>

                <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Nume</mat-label>
                  <input matInput formControlName="lastName" required>
                  @if (personalInfoForm.get('lastName')?.hasError('required') && personalInfoForm.get('lastName')?.touched) {
                    <mat-error>Acest câmp este obligatoriu</mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="half-width">
                  <mat-label>CNP</mat-label>
                  <input matInput formControlName="cnp" [required]="!isForeigner">
                  @if (personalInfoForm.get('cnp')?.hasError('required') && personalInfoForm.get('cnp')?.touched) {
                    <mat-error>Acest câmp este obligatoriu</mat-error>
                  }
                </mat-form-field>

                <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Număr Pașaport</mat-label>
                  <input matInput formControlName="passportNumber" [required]="isForeigner">
                  @if (personalInfoForm.get('passportNumber')?.hasError('required') && personalInfoForm.get('passportNumber')?.touched) {
                    <mat-error>Acest câmp este obligatoriu</mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Data Nașterii</mat-label>
                  <input matInput [matDatepicker]="birthDatePicker" formControlName="birthDate" required>
                  <mat-datepicker-toggle matSuffix [for]="birthDatePicker"></mat-datepicker-toggle>
                  <mat-datepicker #birthDatePicker></mat-datepicker>
                  @if (personalInfoForm.get('birthDate')?.hasError('required') && personalInfoForm.get('birthDate')?.touched) {
                    <mat-error>Acest câmp este obligatoriu</mat-error>
                  }
                </mat-form-field>

                <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Locul Nașterii</mat-label>
                  <input matInput formControlName="birthPlace" required>
                  @if (personalInfoForm.get('birthPlace')?.hasError('required') && personalInfoForm.get('birthPlace')?.touched) {
                    <mat-error>Acest câmp este obligatoriu</mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Telefon</mat-label>
                  <input matInput formControlName="phone" required>
                  @if (personalInfoForm.get('phone')?.hasError('required') && personalInfoForm.get('phone')?.touched) {
                    <mat-error>Acest câmp este obligatoriu</mat-error>
                  }
                </mat-form-field>

                <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Email</mat-label>
                  <input matInput type="email" formControlName="email" required>
                  @if (personalInfoForm.get('email')?.hasError('required') && personalInfoForm.get('email')?.touched) {
                    <mat-error>Acest câmp este obligatoriu</mat-error>
                  }
                  @if (personalInfoForm.get('email')?.hasError('email') && personalInfoForm.get('email')?.touched) {
                    <mat-error>Adresa de email nu este validă</mat-error>
                  }
                </mat-form-field>
              </div>

              <!-- Driver's License Information -->
              @if (selectedCardType?.type === 'DRIVER_TACHOGRAPH') {
                <h3 class="form-subtitle mt-4">Permis de Conducere</h3>
                <div formGroupName="driverLicense">
                  <div class="form-row">
                    <mat-form-field appearance="outline" class="half-width">
                      <mat-label>Număr/Serie Permis</mat-label>
                      <input matInput formControlName="licenseNumber" required>
                      @if (personalInfoForm.get('driverLicense.licenseNumber')?.hasError('required') && personalInfoForm.get('driverLicense.licenseNumber')?.touched) {
                        <mat-error>Acest câmp este obligatoriu</mat-error>
                      }
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="half-width">
                      <mat-label>Categorii Permis</mat-label>
                      <mat-select formControlName="categories" multiple required>
                        <mat-option value="AM">AM - Ciclomotore</mat-option>
                        <mat-option value="A1">A1 - Motociclete ușoare</mat-option>
                        <mat-option value="A2">A2 - Motociclete medii</mat-option>
                        <mat-option value="A">A - Motociclete</mat-option>
                        <mat-option value="B1">B1 - Tricicluri și cvadricicluri</mat-option>
                        <mat-option value="B">B - Autoturisme</mat-option>
                        <mat-option value="BE">BE - Autoturisme cu remorcă</mat-option>
                        <mat-option value="C1">C1 - Autocamioane ușoare</mat-option>
                        <mat-option value="C1E">C1E - Autocamioane ușoare cu remorcă</mat-option>
                        <mat-option value="C">C - Autocamioane</mat-option>
                        <mat-option value="CE">CE - Autocamioane cu remorcă</mat-option>
                        <mat-option value="D1">D1 - Microbuze</mat-option>
                        <mat-option value="D1E">D1E - Microbuze cu remorcă</mat-option>
                        <mat-option value="D">D - Autobuze</mat-option>
                        <mat-option value="DE">DE - Autobuze cu remorcă</mat-option>
                      </mat-select>
                      @if (personalInfoForm.get('driverLicense.categories')?.hasError('required') && personalInfoForm.get('driverLicense.categories')?.touched) {
                        <mat-error>Acest câmp este obligatoriu</mat-error>
                      }
                    </mat-form-field>
                  </div>

                  <div class="form-row">
                    <mat-form-field appearance="outline" class="half-width">
                      <mat-label>Data Emiterii</mat-label>
                      <input matInput [matDatepicker]="issueDatePicker" formControlName="issueDate" required>
                      <mat-datepicker-toggle matSuffix [for]="issueDatePicker"></mat-datepicker-toggle>
                      <mat-datepicker #issueDatePicker></mat-datepicker>
                      @if (personalInfoForm.get('driverLicense.issueDate')?.hasError('required') && personalInfoForm.get('driverLicense.issueDate')?.touched) {
                        <mat-error>Acest câmp este obligatoriu</mat-error>
                      }
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="half-width">
                      <mat-label>Data Expirării</mat-label>
                      <input matInput [matDatepicker]="expiryDatePicker" formControlName="expiryDate" required>
                      <mat-datepicker-toggle matSuffix [for]="expiryDatePicker"></mat-datepicker-toggle>
                      <mat-datepicker #expiryDatePicker></mat-datepicker>
                      @if (personalInfoForm.get('driverLicense.expiryDate')?.hasError('required') && personalInfoForm.get('driverLicense.expiryDate')?.touched) {
                        <mat-error>Acest câmp este obligatoriu</mat-error>
                      }
                    </mat-form-field>
                  </div>

                  <div class="form-row">
                    <mat-form-field appearance="outline" class="half-width">
                      <mat-label>Autoritatea Emitentă</mat-label>
                      <input matInput formControlName="issuingAuthority" required>
                      @if (personalInfoForm.get('driverLicense.issuingAuthority')?.hasError('required') && personalInfoForm.get('driverLicense.issuingAuthority')?.touched) {
                        <mat-error>Acest câmp este obligatoriu</mat-error>
                      }
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="half-width">
                      <mat-label>Țara Emitentă</mat-label>
                      <input matInput formControlName="issuingCountry" required>
                      @if (personalInfoForm.get('driverLicense.issuingCountry')?.hasError('required') && personalInfoForm.get('driverLicense.issuingCountry')?.touched) {
                        <mat-error>Acest câmp este obligatoriu</mat-error>
                      }
                    </mat-form-field>
                  </div>
                </div>
              }

              <!-- Address Form Fields -->
              <h3 class="form-subtitle mt-4">Adresa</h3>
              <div formGroupName="address">
                <div class="form-row">
                  <mat-form-field appearance="outline" class="half-width">
                    <mat-label>Strada</mat-label>
                    <input matInput formControlName="street" required>
                    @if (personalInfoForm.get('address.street')?.hasError('required') && personalInfoForm.get('address.street')?.touched) {
                      <mat-error>Acest câmp este obligatoriu</mat-error>
                    }
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="half-width">
                    <mat-label>Număr</mat-label>
                    <input matInput formControlName="number" required>
                    @if (personalInfoForm.get('address.number')?.hasError('required') && personalInfoForm.get('address.number')?.touched) {
                      <mat-error>Acest câmp este obligatoriu</mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="form-row">
                  <mat-form-field appearance="outline" class="quarter-width">
                    <mat-label>Bloc</mat-label>
                    <input matInput formControlName="building">
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="quarter-width">
                    <mat-label>Scara</mat-label>
                    <input matInput formControlName="entrance">
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="quarter-width">
                    <mat-label>Etaj</mat-label>
                    <input matInput formControlName="floor">
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="quarter-width">
                    <mat-label>Apartament</mat-label>
                    <input matInput formControlName="apartment">
                  </mat-form-field>
                </div>

                <div class="form-row">
                  <mat-form-field appearance="outline" class="half-width">
                    <mat-label>Cod Poștal</mat-label>
                    <input matInput formControlName="postalCode" required>
                    @if (personalInfoForm.get('address.postalCode')?.hasError('required') && personalInfoForm.get('address.postalCode')?.touched) {
                      <mat-error>Acest câmp este obligatoriu</mat-error>
                    }
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="half-width">
                    <mat-label>Localitate</mat-label>
                    <input matInput formControlName="city" required>
                    @if (personalInfoForm.get('address.city')?.hasError('required') && personalInfoForm.get('address.city')?.touched) {
                      <mat-error>Acest câmp este obligatoriu</mat-error>
                    }
                  </mat-form-field>
                </div>

                <div class="form-row">
                  <mat-form-field appearance="outline" class="half-width">
                    <mat-label>Județ</mat-label>
                    <input matInput formControlName="county" required>
                    @if (personalInfoForm.get('address.county')?.hasError('required') && personalInfoForm.get('address.county')?.touched) {
                      <mat-error>Acest câmp este obligatoriu</mat-error>
                    }
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="half-width">
                    <mat-label>Țară</mat-label>
                    <input matInput formControlName="country" required>
                    @if (personalInfoForm.get('address.country')?.hasError('required') && personalInfoForm.get('address.country')?.touched) {
                      <mat-error>Acest câmp este obligatoriu</mat-error>
                    }
                  </mat-form-field>
                </div>
              </div>
            </div>
          </form>
          <div class="step-actions">
            <button mat-button matStepperPrevious>
              <mat-icon>arrow_back</mat-icon>
              Pasul Anterior
            </button>
            <button mat-button matStepperNext [disabled]="!personalInfoForm.valid">
              Următorul Pas
              <mat-icon>arrow_forward</mat-icon>
            </button>
          </div>
        </mat-step>

        <!-- Step 3: Documents -->
        <mat-step [stepControl]="documentsForm">
          <ng-template matStepLabel>Documente</ng-template>
          <form [formGroup]="documentsForm">
            <div class="form-section">
              <h2 class="form-title">Documente Necesare</h2>
              <p class="form-subtitle">Vă rugăm să încărcați documentele necesare</p>

              @if (selectedCardType) {
                <div class="required-documents">
                  <h3>Documente Obligatorii:</h3>
                  <ul>
                    @for (doc of selectedCardType.requiredDocuments; track doc) {
                      <li>{{ doc }}</li>
                    }
                  </ul>
                </div>
              }

              <!-- Document Upload Fields -->
              <div class="document-upload-section">
                <h3>Fotografie</h3>
                <p class="document-hint">Format: JPG, PNG. Dimensiune maximă: {{ selectedCardType?.maxFileSize }}MB</p>
                <!-- File upload component will go here -->

                <h3>Semnătură</h3>
                <p class="document-hint">Format: JPG, PNG. Dimensiune maximă: {{ selectedCardType?.maxFileSize }}MB</p>
                <!-- File upload component will go here -->

                <h3>Documente Suplimentare</h3>
                <p class="document-hint">Format: PDF. Dimensiune maximă: {{ selectedCardType?.maxFileSize }}MB per document</p>
                <!-- File upload component will go here -->
              </div>
            </div>
          </form>
          <div class="step-actions">
            <button mat-button matStepperPrevious>
              <mat-icon>arrow_back</mat-icon>
              Pasul Anterior
            </button>
            <button mat-button (click)="onSubmit()" [disabled]="!isFormValid()">
              Trimite Cererea
              <mat-icon>send</mat-icon>
            </button>
          </div>
        </mat-step>
      </mat-stepper>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .form-section {
      background: white;
      border-radius: var(--arr-border-radius);
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: var(--arr-shadow-sm);
    }

    .form-title {
      color: var(--arr-primary);
      margin-bottom: 1rem;
      font-weight: 500;
    }

    .form-subtitle {
      color: var(--arr-gray-700);
      margin-bottom: 2rem;
      font-weight: 400;
    }

    .form-row {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .full-width {
      width: 100%;
    }

    .half-width {
      width: calc(50% - 0.5rem);
    }

    .quarter-width {
      width: calc(25% - 0.75rem);
    }

    .step-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
    }

    .required-documents {
      background: var(--arr-gray-50);
      padding: 1rem;
      border-radius: var(--arr-border-radius);
      margin-bottom: 2rem;

      h3 {
        color: var(--arr-gray-800);
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }

      ul {
        margin: 0;
        padding-left: 1.5rem;
        color: var(--arr-gray-700);

        li {
          margin-bottom: 0.5rem;
        }
      }
    }

    .document-upload-section {
      h3 {
        color: var(--arr-gray-800);
        margin: 1.5rem 0 0.5rem;
        font-size: 1rem;
      }

      .document-hint {
        color: var(--arr-gray-600);
        font-size: 0.9rem;
        margin-bottom: 1rem;
      }
    }

    @media (max-width: 600px) {
      .form-container {
        padding: 1rem;
      }

      .form-section {
        padding: 1rem;
      }

      .form-row {
        flex-direction: column;
        gap: 0;
      }

      .half-width,
      .quarter-width {
        width: 100%;
      }
    }
  `]
})
export class BaseApplicationFormComponent implements OnInit {
  @Input() initialCardType?: CardType;
  @Output() cardTypeSelected = new EventEmitter<CardType>();

  cardTypes: CardTypeInfo[] = [];
  agencies: any[] = [];
  selectedCardType?: CardTypeInfo;
  isForeigner = false;

  // Form groups
  cardTypeForm: FormGroup;
  personalInfoForm: FormGroup;
  documentsForm: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected mockDataService: MockDataService,
    protected router: Router,
    protected snackBar: MatSnackBar
  ) {
    // Initialize form groups
    this.cardTypeForm = this.fb.group({
      cardType: ['', Validators.required],
      requestType: ['', Validators.required],
      agencyId: ['', Validators.required]
    });

    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cnp: [''],
      passportNumber: [''],
      birthDate: ['', Validators.required],
      birthPlace: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      driverLicense: this.fb.group({
        licenseNumber: [''],
        categories: [[]],
        issueDate: [''],
        expiryDate: [''],
        issuingAuthority: [''],
        issuingCountry: ['']
      }),
      address: this.fb.group({
        street: ['', Validators.required],
        number: ['', Validators.required],
        building: [''],
        entrance: [''],
        floor: [''],
        apartment: [''],
        postalCode: ['', Validators.required],
        city: ['', Validators.required],
        county: ['', Validators.required],
        country: ['', Validators.required]
      })
    });

    this.documentsForm = this.fb.group({
      // Document form controls will be added here
    });
  }

  ngOnInit(): void {
    // Load card types and agencies
    this.mockDataService.getCardTypes().subscribe(types => {
      this.cardTypes = types;
      if (this.initialCardType) {
        this.cardTypeForm.patchValue({ cardType: this.initialCardType });
        this.onCardTypeSelected({ value: this.initialCardType });
      }
    });

    this.mockDataService.getAgencies().subscribe(agencies => {
      this.agencies = agencies;
    });

    // Watch for CNP/Passport changes to determine if user is foreigner
    this.personalInfoForm.get('cnp')?.valueChanges.subscribe(value => {
      this.isForeigner = !value;
      this.updatePassportValidation();
    });

    this.personalInfoForm.get('passportNumber')?.valueChanges.subscribe(value => {
      this.isForeigner = !!value;
      this.updateCnpValidation();
    });
  }

  onCardTypeSelected(event: any): void {
    const cardType = event.value as CardType;
    const cardTypeInfo = this.cardTypes.find(t => t.type === cardType);
    
    if (cardTypeInfo) {
      this.selectedCardType = cardTypeInfo;
      this.cardTypeSelected.emit(cardType);
      this.updateFormValidation();
    }
  }

  protected updateFormValidation(): void {
    // Update form validation based on selected card type and request type
    // This will be implemented by child components

    // Add validation for driver's license when card type is DRIVER_TACHOGRAPH
    const driverLicenseGroup = this.personalInfoForm.get('driverLicense');
    if (this.selectedCardType?.type === 'DRIVER_TACHOGRAPH') {
      driverLicenseGroup?.get('licenseNumber')?.setValidators(Validators.required);
      driverLicenseGroup?.get('categories')?.setValidators(Validators.required);
      driverLicenseGroup?.get('issueDate')?.setValidators(Validators.required);
      driverLicenseGroup?.get('expiryDate')?.setValidators(Validators.required);
      driverLicenseGroup?.get('issuingAuthority')?.setValidators(Validators.required);
      driverLicenseGroup?.get('issuingCountry')?.setValidators(Validators.required);
    } else {
      driverLicenseGroup?.get('licenseNumber')?.clearValidators();
      driverLicenseGroup?.get('categories')?.clearValidators();
      driverLicenseGroup?.get('issueDate')?.clearValidators();
      driverLicenseGroup?.get('expiryDate')?.clearValidators();
      driverLicenseGroup?.get('issuingAuthority')?.clearValidators();
      driverLicenseGroup?.get('issuingCountry')?.clearValidators();
    }
    driverLicenseGroup?.updateValueAndValidity();
  }

  private updateCnpValidation(): void {
    const cnpControl = this.personalInfoForm.get('cnp');
    if (this.isForeigner) {
      cnpControl?.clearValidators();
    } else {
      cnpControl?.setValidators(Validators.required);
    }
    cnpControl?.updateValueAndValidity();
  }

  private updatePassportValidation(): void {
    const passportControl = this.personalInfoForm.get('passportNumber');
    if (this.isForeigner) {
      passportControl?.setValidators(Validators.required);
    } else {
      passportControl?.clearValidators();
    }
    passportControl?.updateValueAndValidity();
  }

  isFormValid(): boolean {
    return this.cardTypeForm.valid && 
           this.personalInfoForm.valid && 
           this.documentsForm.valid;
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      const application: Partial<CardApplication> = {
        ...this.cardTypeForm.value,
        personalInfo: this.personalInfoForm.value,
        // Add document information here
      };

      this.mockDataService.createApplication(application as CardApplication).subscribe({
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