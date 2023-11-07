import { Users } from "./users"

export class Acknowledgment {
    idAcknowledgment: number = 0
    description: string = ""
    dateAcknowledgment: Date = new Date(Date.now())
    user: Users = new Users();
}