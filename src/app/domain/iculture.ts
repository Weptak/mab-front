import { IArtefact } from './iartefact';

export interface ICulture {
  id: number;
  name: string;
  description: string;
  periodDescription: string;
  cultureMap: string;
  startYear: number;
  endYear: number;
}
