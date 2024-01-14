export interface Word {
  id: number;
  createdBy: string;
  lastModifiedBy: string;
  createdDate: string;
  lastModifiedDate: string;
  isActive: string;
  tr: string;
  en: string;
}

export interface WordSearchDto {
  tr: string;
  en: string;
}
