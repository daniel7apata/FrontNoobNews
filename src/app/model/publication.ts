export class Publication{
  idPublication:number=0
  headline:string=""
  lead:string=""
  body:string=""
  attachedFile:string=""
  datePublication: Date = new Date(Date.now())
  popular:boolean=false
  id_user:number=0
}
