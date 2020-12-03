import { ICulture } from './iculture';

export interface IArtefact {
  id: string;
  name: string;
  objectDescription: string;
  periodDescription: string;
  culturalPhase: string;
  type: string;
  material: string;
  localisation: string;
  imageURL: string;
  onPermanentDisplay: boolean;
  inExposition: boolean;
  dateOfEntry: Date;
  startYear: number;
  endYear: number;
  culture: ICulture;
}
