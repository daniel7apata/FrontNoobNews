import { Category } from "./category"
import { Users } from "./users"


export class Publication {
    idPublication: number = 0
    headline: string = ""
    lead: string = ""
    body: string = ""
    attachedFile: string = ""
    datePublication: Date = new Date(Date.now())
    popular: boolean = true
    user: Users = new Users()
    category: Category = new Category()
}

