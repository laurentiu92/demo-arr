import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

import { BaseApplicationFormComponent } from '../../../shared/components/base-application-form/base-application-form.component';
import { CardType } from '../../../models/card-types.enum';
import { MockDataService } from '../../../core/services/mock-data.service';

@Component({
  selector: 'app-workshop-tachograph',
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
    MatDividerModule
  ],
  template: `
    <app-base-application-form [initialCardType]="CardType.WORKSHOP_TACHOGRAPH">
      <form [formGroup]="workshopForm" class="form-section">
        <h2 class="form-title">Informații Atelier</h2>
        <p class="form-subtitle">Vă rugăm să completați informațiile despre atelier</p>

        <!-- Workshop Registration Information -->
        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Cod Unic de Înregistrare (CUI)</mat-label>
            <input matInput formControlName="cui" required>
            @if (workshopForm.get('cui')?.hasError('required') && workshopForm.get('cui')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
            @if (workshopForm.get('cui')?.hasError('pattern') && workshopForm.get('cui')?.touched) {
              <mat-error>Format CUI invalid</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Denumire Atelier</mat-label>
            <input matInput formControlName="workshopName" required>
            @if (workshopForm.get('workshopName')?.hasError('required') && workshopForm.get('workshopName')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Registrul Comerțului</mat-label>
            <input matInput formControlName="tradeRegister" required>
            @if (workshopForm.get('tradeRegister')?.hasError('required') && workshopForm.get('tradeRegister')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Cod CAEN</mat-label>
            <input matInput formControlName="caenCode" required>
            @if (workshopForm.get('caenCode')?.hasError('required') && workshopForm.get('caenCode')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
            @if (workshopForm.get('caenCode')?.hasError('pattern') && workshopForm.get('caenCode')?.touched) {
              <mat-error>Format CAEN invalid</mat-error>
            }
          </mat-form-field>
        </div>

        <mat-divider class="my-4"></mat-divider>

        <!-- Technical Authorization Information -->
        <h3 class="form-subtitle">Autorizații Tehnice</h3>
        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Număr Autorizație Tehnică</mat-label>
            <input matInput formControlName="technicalAuthorizationNumber" required>
            @if (workshopForm.get('technicalAuthorizationNumber')?.hasError('required') && workshopForm.get('technicalAuthorizationNumber')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Data Emiterii Autorizației</mat-label>
            <input matInput [matDatepicker]="authorizationDatePicker" formControlName="technicalAuthorizationDate" required>
            <mat-datepicker-toggle matSuffix [for]="authorizationDatePicker"></mat-datepicker-toggle>
            <mat-datepicker #authorizationDatePicker></mat-datepicker>
            @if (workshopForm.get('technicalAuthorizationDate')?.hasError('required') && workshopForm.get('technicalAuthorizationDate')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Tipuri de Autorizații</mat-label>
            <mat-select formControlName="authorizationTypes" multiple required>
              <mat-option value="INSTALLATION">Instalare</mat-option>
              <mat-option value="CALIBRATION">Calibrare</mat-option>
              <mat-option value="REPAIR">Reparație</mat-option>
              <mat-option value="PERIODIC_TEST">Testare Periodică</mat-option>
            </mat-select>
            @if (workshopForm.get('authorizationTypes')?.hasError('required') && workshopForm.get('authorizationTypes')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
          </mat-form-field>
        </div>

        <mat-divider class="my-4"></mat-divider>

        <!-- Equipment and Personnel Information -->
        <h3 class="form-subtitle">Echipamente și Personal</h3>
        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Număr Tehnicieni Autorizați</mat-label>
            <input matInput type="number" formControlName="authorizedTechnicians" required>
            @if (workshopForm.get('authorizedTechnicians')?.hasError('required') && workshopForm.get('authorizedTechnicians')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
            @if (workshopForm.get('authorizedTechnicians')?.hasError('min') && workshopForm.get('authorizedTechnicians')?.touched) {
              <mat-error>Numărul minim de tehnicieni este 1</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Număr Echipamente de Calibrare</mat-label>
            <input matInput type="number" formControlName="calibrationEquipment" required>
            @if (workshopForm.get('calibrationEquipment')?.hasError('required') && workshopForm.get('calibrationEquipment')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
            @if (workshopForm.get('calibrationEquipment')?.hasError('min') && workshopForm.get('calibrationEquipment')?.touched) {
              <mat-error>Numărul minim de echipamente este 1</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Tipuri de Echipamente</mat-label>
            <mat-select formControlName="equipmentTypes" multiple required>
              <mat-option value="DIGITAL">Tachografe Digitale</mat-option>
              <mat-option value="ANALOG">Tachografe Analogice</mat-option>
              <mat-option value="SMART">Tachografe Smart</mat-option>
              <mat-option value="GNSS">Echipamente GNSS</mat-option>
            </mat-select>
            @if (workshopForm.get('equipmentTypes')?.hasError('required') && workshopForm.get('equipmentTypes')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
          </mat-form-field>
        </div>

        <mat-divider class="my-4"></mat-divider>

        <!-- Additional Information -->
        <h3 class="form-subtitle">Informații Suplimentare</h3>
        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Observații</mat-label>
            <textarea matInput formControlName="notes" rows="4"></textarea>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-checkbox formControlName="hasQualitySystem" color="primary">
            Atelierul are sistem de management al calității certificat
          </mat-checkbox>
        </div>

        <div class="form-row">
          <mat-checkbox formControlName="hasTrainingProgram" color="primary">
            Atelierul are program de instruire pentru tehnicieni
          </mat-checkbox>
        </div>

        <div class="form-row">
          <mat-checkbox formControlName="hasEmergencyService" color="primary">
            Atelierul oferă servicii de urgență
          </mat-checkbox>
        </div>
      </form>
    </app-base-application-form>
  `,
  styles: [`
    .form-section {
      margin-top: 2rem;
    }

    .my-4 {
      margin: 2rem 0;
    }

    .form-row {
      margin-bottom: 1rem;
    }

    mat-checkbox {
      margin: 1rem 0;
    }
  `]
})
export class WorkshopTachographComponent extends BaseApplicationFormComponent implements OnInit {
  protected readonly CardType = CardType;
  workshopForm: FormGroup;

  constructor(
    protected override fb: FormBuilder,
    protected override mockDataService: MockDataService,
    protected override router: Router,
    protected override snackBar: MatSnackBar
  ) {
    super(fb, mockDataService, router, snackBar);

    this.workshopForm = this.fb.group({
      cui: ['', [Validators.required, Validators.pattern('^RO[0-9]{2,10}$')]],
      workshopName: ['', Validators.required],
      tradeRegister: ['', Validators.required],
      caenCode: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      technicalAuthorizationNumber: ['', Validators.required],
      technicalAuthorizationDate: ['', Validators.required],
      authorizationTypes: [[], Validators.required],
      authorizedTechnicians: [0, [Validators.required, Validators.min(1)]],
      calibrationEquipment: [0, [Validators.required, Validators.min(1)]],
      equipmentTypes: [[], Validators.required],
      notes: [''],
      hasQualitySystem: [false],
      hasTrainingProgram: [false],
      hasEmergencyService: [false]
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.updateFormValidation();
  }

  protected override updateFormValidation(): void {
    // Add cross-field validation if needed
    this.workshopForm.get('authorizationTypes')?.valueChanges.subscribe(types => {
      const equipmentTypes = this.workshopForm.get('equipmentTypes');
      if (types.includes('CALIBRATION')) {
        equipmentTypes?.setValidators([Validators.required, Validators.minLength(1)]);
      } else {
        equipmentTypes?.clearValidators();
      }
      equipmentTypes?.updateValueAndValidity();
    });
  }

  override isFormValid(): boolean {
    return super.isFormValid() && this.workshopForm.valid;
  }

  override onSubmit(): void {
    if (this.isFormValid()) {
      const application = {
        ...this.cardTypeForm.value,
        personalInfo: this.personalInfoForm.value,
        workshopInfo: this.workshopForm.value
      };

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