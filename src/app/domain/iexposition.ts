import { IArtefact } from './iartefact';

export interface IExposition {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  visitorCount: number;
  exposedArtefacts: Array<IArtefact>;
}
