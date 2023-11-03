import { Users } from "./users"

export class Role{
  idRole:number=0
  role:string=""
  editPermission:boolean=false
  user: Users = new Users()
}
