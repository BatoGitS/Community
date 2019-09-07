import { Observable } from 'rxjs';

export interface ITechnology {
  name: string;
  description: string;
  id?: string;
}

export abstract class TechnologyData {
  abstract getTechnologies(): Observable<ITechnology[]>;
  abstract createTechnology(tech: ITechnology): Observable<ITechnology>;
}
