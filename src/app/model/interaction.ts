import { Publication } from "./publication"
import { Users } from "./users"

export class Interaction{
  idInteraction:number=0
  dateInteraction: Date = new Date(Date.now())
  timeInteraction: Date = new Date(Date.now())
  liked:boolean=false
  shared:boolean=false
  comment:string=""
  publication: Publication = new Publication()
  user: Users = new Users()
}
