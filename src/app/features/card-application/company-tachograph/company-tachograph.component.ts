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
  selector: 'app-company-tachograph',
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
    <app-base-application-form [initialCardType]="CardType.COMPANY_TACHOGRAPH">
      <form [formGroup]="companyForm" class="form-section">
        <h2 class="form-title">Informații Companie</h2>
        <p class="form-subtitle">Vă rugăm să completați informațiile despre companie</p>

        <!-- Company Registration Information -->
        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Cod Unic de Înregistrare (CUI)</mat-label>
            <input matInput formControlName="cui" required>
            @if (companyForm.get('cui')?.hasError('required') && companyForm.get('cui')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Denumire Companie</mat-label>
            <input matInput formControlName="companyName" required>
            @if (companyForm.get('companyName')?.hasError('required') && companyForm.get('companyName')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Registrul Comerțului</mat-label>
            <input matInput formControlName="tradeRegister" required>
            @if (companyForm.get('tradeRegister')?.hasError('required') && companyForm.get('tradeRegister')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Cod CAEN</mat-label>
            <input matInput formControlName="caenCode" required>
            @if (companyForm.get('caenCode')?.hasError('required') && companyForm.get('caenCode')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
          </mat-form-field>
        </div>

        <mat-divider class="my-4"></mat-divider>

        <!-- Legal Representative Information -->
        <h3 class="form-subtitle">Reprezentant Legal</h3>
        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Nume Reprezentant Legal</mat-label>
            <input matInput formControlName="legalRepresentativeName" required>
            @if (companyForm.get('legalRepresentativeName')?.hasError('required') && companyForm.get('legalRepresentativeName')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Funcție</mat-label>
            <input matInput formControlName="legalRepresentativePosition" required>
            @if (companyForm.get('legalRepresentativePosition')?.hasError('required') && companyForm.get('legalRepresentativePosition')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
          </mat-form-field>
        </div>

        <mat-divider class="my-4"></mat-divider>

        <!-- Vehicle Information -->
        <h3 class="form-subtitle">Informații Vehicule</h3>
        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Număr Total Vehicule</mat-label>
            <input matInput type="number" formControlName="totalVehicles" required>
            @if (companyForm.get('totalVehicles')?.hasError('required') && companyForm.get('totalVehicles')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Număr Vehicule cu Tachograf</mat-label>
            <input matInput type="number" formControlName="vehiclesWithTachograph" required>
            @if (companyForm.get('vehiclesWithTachograph')?.hasError('required') && companyForm.get('vehiclesWithTachograph')?.touched) {
              <mat-error>Acest câmp este obligatoriu</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Tipuri de Vehicule</mat-label>
            <mat-select formControlName="vehicleTypes" multiple required>
              <mat-option value="M1">M1 - Autoturisme</mat-option>
              <mat-option value="M2">M2 - Autobuze</mat-option>
              <mat-option value="M3">M3 - Autobuze</mat-option>
              <mat-option value="N1">N1 - Camioane ușoare</mat-option>
              <mat-option value="N2">N2 - Camioane medii</mat-option>
              <mat-option value="N3">N3 - Camioane grele</mat-option>
            </mat-select>
            @if (companyForm.get('vehicleTypes')?.hasError('required') && companyForm.get('vehicleTypes')?.touched) {
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
          <mat-checkbox formControlName="hasMaintenanceContract" color="primary">
            Compania are contract de mentenanță pentru tachografe
          </mat-checkbox>
        </div>

        <div class="form-row">
          <mat-checkbox formControlName="hasTrainingProgram" color="primary">
            Compania are program de instruire pentru șoferi
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
export class CompanyTachographComponent extends BaseApplicationFormComponent implements OnInit {
  protected readonly CardType = CardType;
  companyForm: FormGroup;

  constructor(
    protected override fb: FormBuilder,
    protected override mockDataService: MockDataService,
    protected override router: Router,
    protected override snackBar: MatSnackBar
  ) {
    super(fb, mockDataService, router, snackBar);

    this.companyForm = this.fb.group({
      cui: ['', [Validators.required, Validators.pattern('^RO[0-9]{2,10}$')]],
      companyName: ['', Validators.required],
      tradeRegister: ['', Validators.required],
      caenCode: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      legalRepresentativeName: ['', Validators.required],
      legalRepresentativePosition: ['', Validators.required],
      totalVehicles: [0, [Validators.required, Validators.min(0)]],
      vehiclesWithTachograph: [0, [Validators.required, Validators.min(0)]],
      vehicleTypes: [[], Validators.required],
      notes: [''],
      hasMaintenanceContract: [false],
      hasTrainingProgram: [false]
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.updateFormValidation();
  }

  protected override updateFormValidation(): void {
    // Add cross-field validation if needed
    this.companyForm.get('vehiclesWithTachograph')?.setValidators([
      Validators.required,
      Validators.min(0),
      this.maxVehiclesValidator()
    ]);
    this.companyForm.get('vehiclesWithTachograph')?.updateValueAndValidity();
  }

  private maxVehiclesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const totalVehicles = this.companyForm?.get('totalVehicles')?.value;
      const vehiclesWithTachograph = control.value;
      
      if (totalVehicles !== null && vehiclesWithTachograph > totalVehicles) {
        return { maxVehicles: true };
      }
      return null;
    };
  }

  override isFormValid(): boolean {
    return super.isFormValid() && this.companyForm.valid;
  }

  override onSubmit(): void {
    if (this.isFormValid()) {
      const application = {
        ...this.cardTypeForm.value,
        personalInfo: this.personalInfoForm.value,
        companyInfo: this.companyForm.value
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