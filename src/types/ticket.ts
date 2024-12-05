import { Urgency } from './urgency';
import { User } from './user';

export type TicketStatus = {
  id: number;
  name: string;
};

export type Ticket = {
  id: number;
  description: string;
  title: string;
  location: string;
  urgency: Urgency;
  reporter: User;
  responsible: User;
  identifier: string;
  status: TicketStatus;
  images: string[];
  closureComment?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TicketForm = {
  title: string;
  description: string;
  location: string;
  urgencyId: number;
  incidentId: number;
  responsibleId: number;
  statusId: number;
};

export function getTicketStatusColor(statusId: number): string {
  const colorsMap: Record<number, string> = {
    1: 'yellow',
    2: 'blue',
    3: 'green',
    4: 'red',
  };

  return colorsMap[statusId] || 'yellow';
}
