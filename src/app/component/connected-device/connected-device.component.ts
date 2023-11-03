import { ConnectedDevice } from './../../model/connected-device';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { ConnectedDeviceService } from 'src/app/service/connected-device.service';


@Component({
  selector: 'app-connected-device',
  templateUrl: './connected-device.component.html',
  styleUrls: ['./connected-device.component.css']
})
export class ConnectedDeviceComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  connectedDevice: ConnectedDevice = new ConnectedDevice();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  id: number = 0;
  edicion: boolean = false;

  constructor(

    private cD: ConnectedDeviceService,
    //private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
  
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
  
    this.form = this.formBuilder.group({
      //idConfiguration: ['', Validators.required],
      nameDevice: ['', Validators.required],
      birthDate: ['', Validators.required],
      timeDevice: ['', Validators.required],      
    });
  }
  aceptar(): void {
    if (this.form.valid) {
  
      //this.configuracion.idConfiguration = this.form.value.idConfiguration
      this.connectedDevice.nameDevice = this.form.value.nameDevice;
      this.connectedDevice.birthDate = this.form.value.birthDate;
      this.connectedDevice.timeDevice = this.form.value.timeDevice;
  
      if (this.edicion) {
        this.cD.update(this.connectedDevice).subscribe(() => {
          this.cD.list().subscribe(data => {
            this.cD.setList(data);
          })
        })
      } else {
        this.cD.insert(this.connectedDevice).subscribe((data) => {
          this.cD.list().subscribe((data) => {
            this.cD.setList(data);
          });
        });
      }
  
    } 
     else {
     this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }
  
  
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  
  init() {
    if (this.edicion) {
      this.cD.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idConnectedDevice: new FormControl(data.idConnectedDevice),
          nameDevice: new FormControl(data.nameDevice),
          birthDate: new FormControl(data.birthDate),
          timeDevice: new FormControl(data.timeDevice)
        });
      });
    }
  }

}
