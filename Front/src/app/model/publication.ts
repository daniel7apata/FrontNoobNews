import { Category } from "./category"
import { LogicUser } from "./logicuser"


export class Publication {
    idPublication: number = 0
    headline: string = ""
    lead: string = ""
    body: string = ""
    attachedFile: string = ""
    datePublication: Date = new Date(Date.now())
    popular: boolean = true
    logicUser: LogicUser = new LogicUser()
    category: Category = new Category()
}

