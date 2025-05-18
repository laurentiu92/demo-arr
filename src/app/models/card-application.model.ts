import { CardType, CardRequestType, CardReplacementReason, CardChangeReason } from './card-types.enum';

export interface Address {
  street: string;
  number: string;
  building?: string;
  entrance?: string;
  apartment?: string;
  postalCode: string;
  city: string;
  county: string;
  country: string;
}

export interface PersonalInfo {
  cnp?: string;
  passportNumber?: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  birthPlace: string;
  phone: string;
  email: string;
  address: Address;
}

export interface CompanyInfo {
  name: string;
  fiscalCode: string;
  address: Address;
  phone: string;
  email: string;
}

export interface DrivingLicenseInfo {
  number: string;
  categories: string[];
  issueDate: Date;
  expiryDate: Date;
  issuingAuthority: string;
  issuingCountry: string;
}

export interface DocumentUpload {
  id: string;
  type: string;
  fileName: string;
  fileSize: number;
  uploadDate: Date;
  status: 'PENDING' | 'VALIDATED' | 'REJECTED';
  rejectionReason?: string;
}

export interface CardApplication {
  id: string;
  cardType: CardType;
  requestType: CardRequestType;
  agencyId: string;
  registrationNumber?: string;
  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  submissionDate?: Date;
  reviewDate?: Date;
  rejectionReason?: string;
  
  // Common fields
  personalInfo: PersonalInfo;
  photo?: DocumentUpload;
  signature?: DocumentUpload;
  documents: DocumentUpload[];
  
  // Specific fields based on card type
  drivingLicense?: DrivingLicenseInfo;
  companyInfo?: CompanyInfo;
  
  // Fields for specific request types
  replacementReason?: CardReplacementReason;
  changeReasons?: CardChangeReason[];
  previousCardNumber?: string;
  previousCardExpiryDate?: Date;
  previousName?: string;
  previousAddress?: Address;
  
  // ADR specific
  adrExtensions?: string[]; // ['CISTERNS', 'CLASS1', 'CLASS7']
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
} 