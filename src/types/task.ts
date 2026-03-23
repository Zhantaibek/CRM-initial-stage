export interface Task {
  id? : number,
  dealId : number ,
  assignedUserId : number,
  description : string,
  dueDate ? : string,
  status? :  'pending' | 'done'
}