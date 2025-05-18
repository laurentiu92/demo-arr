import { Component } from '@angular/core';
import { BaseApplicationFormComponent } from '../../../shared/components/base-application-form/base-application-form.component';
import { CardType } from '../../../models/card-types.enum';

@Component({
  selector: 'app-workshop-tachograph',
  standalone: true,
  imports: [BaseApplicationFormComponent],
  template: `
    <app-base-application-form [initialCardType]="CardType.WORKSHOP_TACHOGRAPH">
    </app-base-application-form>
  `
})
export class WorkshopTachographComponent extends BaseApplicationFormComponent {
  protected readonly CardType = CardType;
} 