import { LogicUser } from "./logicuser";

export class Acknowledgment {
    idAcknowledgment: number = 0
    description: string = ""
    dateAcknowledgment: Date = new Date(Date.now())
    logicUser: LogicUser = new LogicUser();
}