import { Urgency } from './urgency';
import { User } from './user';

export type Incident = {
  id: number;
  description: string;
  title: string;
  location: string;
  urgency: Urgency;
  reporter: User;
  createdAt: Date;
  updatedAt: Date;
};

export type IncidentForm = {
  title: string;
  description: string;
  location: string;
  urgencyId: number;
};
