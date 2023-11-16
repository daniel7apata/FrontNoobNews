import { Publication } from "./publication";
import { LogicUser } from "./logicuser";

export class Interaction {
    idInteraction: number = 0
    dateInteraction: Date = new Date(Date.now());
    liked:boolean = false;
    shared:boolean = false;
    comment: string = ""
    publication: Publication = new Publication();
    logicUser: LogicUser = new LogicUser();
}
