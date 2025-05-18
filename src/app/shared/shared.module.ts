import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { PersonalInfoFormComponent } from './components/personal-info-form/personal-info-form.component';
import { CompanyInfoFormComponent } from './components/company-info-form/company-info-form.component';
import { DrivingLicenseFormComponent } from './components/driving-license-form/driving-license-form.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { CardTypeSelectorComponent } from './components/card-type-selector/card-type-selector.component';
import { AgencySelectorComponent } from './components/agency-selector/agency-selector.component';

const sharedComponents = [
  FileUploadComponent,
  AddressFormComponent,
  PersonalInfoFormComponent,
  CompanyInfoFormComponent,
  DrivingLicenseFormComponent,
  DocumentListComponent,
  CardTypeSelectorComponent,
  AgencySelectorComponent
];

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatStepperModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDividerModule,
  MatListModule,
  MatTooltipModule,
  MatDialogModule
];

@NgModule({
  declarations: [...sharedComponents],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...materialModules
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ...materialModules,
    ...sharedComponents
  ]
})
export class SharedModule { } 