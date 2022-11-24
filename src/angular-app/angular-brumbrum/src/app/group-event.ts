export interface GroupEvent {
    id: number;
    type: string;
    sum: number | null;
    distance: number | null;
    description: string;
    date: string;
    done_fors: any[];
    done_bies: any[];
}