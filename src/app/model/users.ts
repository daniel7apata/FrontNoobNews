import { Configuration } from "./configuration"
import { University } from "./university"


export class Users{
    idUser:number=0
    nameUser:string=""
    fatherSurname:string=""
    motherSurname:string=""
    birthDate:Date=new Date(Date.now())
    email:string=""
    password:string=""
    profileLinkedIn:string=""
    registrationDate:Date=new Date(Date.now())
    //private List<Role> roles
    configuration:Configuration=new Configuration()
    university:University=new University()
    username:string=""
    enabled:boolean=true
}

