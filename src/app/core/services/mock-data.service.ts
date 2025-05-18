import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CardType, CardTypeInfo } from '../../models/card-types.enum';
import { CardApplication } from '../../models/card-application.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private readonly cardTypes: CardTypeInfo[] = [
    {
      type: CardType.DRIVER_TACHOGRAPH,
      label: 'Card Tahograf Conducător Auto',
      description: 'Card tahograf pentru conducătorii auto profesioniști',
      icon: 'directions_car',
      requiredDocuments: [
        'Act de identitate',
        'Permis de conducere (față/verso)',
        'Dovada rezidenței în România (pentru cetățeni străini)',
        'Dovada plății tarifului',
        'Declarație pe proprie răspundere (pentru carduri pierdute)'
      ],
      maxFileSize: 5
    },
    {
      type: CardType.COMPANY_TACHOGRAPH,
      label: 'Card Tahograf Companie',
      description: 'Card tahograf pentru companii de transport',
      icon: 'business',
      requiredDocuments: [
        'Act de identitate al reprezentantului',
        'Împuternicire pentru reprezentant',
        'Dovada plății tarifului',
        'Document de modificare adresă (dacă aplicabil)'
      ],
      maxFileSize: 5
    },
    {
      type: CardType.WORKSHOP_TACHOGRAPH,
      label: 'Card Tahograf Atelier',
      description: 'Card tahograf pentru ateliere autorizate',
      icon: 'build',
      requiredDocuments: [
        'Act de identitate al persoanei nominalizate',
        'Document RAR de capabilitate tehnică',
        'Dovada plății tarifului',
        'Document de modificare adresă (dacă aplicabil)'
      ],
      maxFileSize: 5
    },
    {
      type: CardType.CPP,
      label: 'Card Certificat Pregătire Profesională (CPP)',
      description: 'Certificat de pregătire profesională pentru conducătorii auto',
      icon: 'school',
      requiredDocuments: [
        'Act de identitate',
        'Permis de conducere (față/verso)',
        'Dovada plății tarifului'
      ],
      maxFileSize: 5
    },
    {
      type: CardType.ADR,
      label: 'Card Certificat Pregătire Profesională (ADR)',
      description: 'Certificat de pregătire profesională pentru transportul mărfurilor periculoase',
      icon: 'local_shipping',
      requiredDocuments: [
        'Act de identitate',
        'Permis de conducere (față/verso)',
        'Dovada plății tarifului'
      ],
      maxFileSize: 5
    }
  ];

  private readonly agencies = [
    { id: 'ARR-BUC-1', name: 'Agenția ARR București 1', address: 'București, Sector 1' },
    { id: 'ARR-BUC-2', name: 'Agenția ARR București 2', address: 'București, Sector 2' },
    { id: 'ARR-CLJ', name: 'Agenția ARR Cluj', address: 'Cluj-Napoca' },
    { id: 'ARR-TIM', name: 'Agenția ARR Timișoara', address: 'Timișoara' },
    { id: 'ARR-IAS', name: 'Agenția ARR Iași', address: 'Iași' }
  ];

  private mockApplications: CardApplication[] = [];

  constructor() {
    // Initialize with some mock applications
    this.initializeMockApplications();
  }

  getCardTypes(): Observable<CardTypeInfo[]> {
    return of(this.cardTypes);
  }

  getAgencies(): Observable<any[]> {
    return of(this.agencies);
  }

  getApplications(): Observable<CardApplication[]> {
    return of(this.mockApplications);
  }

  createApplication(application: CardApplication): Observable<CardApplication> {
    const newApplication = {
      ...application,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'user',
      updatedBy: 'user'
    };
    this.mockApplications.push(newApplication);
    return of(newApplication);
  }

  updateApplication(application: CardApplication): Observable<CardApplication> {
    const index = this.mockApplications.findIndex(a => a.id === application.id);
    if (index !== -1) {
      const updatedApplication = {
        ...application,
        updatedAt: new Date(),
        updatedBy: 'user'
      };
      this.mockApplications[index] = updatedApplication;
      return of(updatedApplication);
    }
    return of(application);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private initializeMockApplications(): void {
    // Add some mock applications here if needed
  }
} 