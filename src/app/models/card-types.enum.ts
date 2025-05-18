export enum CardType {
  DRIVER_TACHOGRAPH = 'DRIVER_TACHOGRAPH',
  COMPANY_TACHOGRAPH = 'COMPANY_TACHOGRAPH',
  WORKSHOP_TACHOGRAPH = 'WORKSHOP_TACHOGRAPH',
  CPP = 'CPP',
  ADR = 'ADR'
}

export enum CardRequestType {
  NEW = 'NEW',
  RENEWAL = 'RENEWAL',
  REPLACEMENT = 'REPLACEMENT',
  CHANGE = 'CHANGE',
  EXTENSION = 'EXTENSION'
}

export enum CardReplacementReason {
  LOST = 'LOST',
  STOLEN = 'STOLEN',
  DAMAGED = 'DAMAGED'
}

export enum CardChangeReason {
  NAME = 'NAME',
  ADDRESS = 'ADDRESS',
  DRIVING_LICENSE = 'DRIVING_LICENSE',
  PHOTO = 'PHOTO'
}

export interface CardTypeInfo {
  type: CardType;
  label: string;
  description: string;
  icon: string;
  requiredDocuments: string[];
  maxFileSize: number; // in MB
} 