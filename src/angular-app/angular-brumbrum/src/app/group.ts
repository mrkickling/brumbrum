import { GroupEvent } from './group-event';

export interface Group {
    id: number;
    title: string;
    description: string;
    code: string;
    createdAt: string;
    updatedAt: string;
    members: any;
    events: GroupEvent[];
}