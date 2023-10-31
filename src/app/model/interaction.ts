export class Interaction{
  idInteraction:number=0
  dateInteraction: Date = new Date(Date.now())
  timeInteraction: Date = new Date(Date.now())
  liked:boolean=false
  shared:boolean=false
  comment:string=""
  id_publication:number=0
  id_user:number=0
}
