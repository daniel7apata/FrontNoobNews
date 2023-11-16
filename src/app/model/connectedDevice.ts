import { Configuration } from "./configuration";


export class ConnectedDevice {
    idConnectedDevice: number = 0
    nameDevice: string = "";
    dateDevice: Date = new Date(Date.now());
    timeDevice: Date = new Date(Date.now());
    configuration: Configuration = new Configuration();
}

