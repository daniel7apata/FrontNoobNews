import { Configuration } from "./configuration";


export class ConnectedDevice {
    idExternalPublication: number = 0
    headline: string = ""
    link: string = ""
 


    idConnectedDevice:number = 0;
    nameDevice: string = "";
    dateDevice: Date = new Date(Date.now());
    timeDevice: Date = new Date(Date.now());
    configuration: Configuration = new Configuration();

}

