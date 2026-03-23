export interface Deal {
    id? : number,
    client : number,
    assignedUserId : number,
    status : 'new' | 'in_progress' | 'won' | 'lost',
    createdAt? : string
}