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
import { Configuration } from 'src/app/model/configuration';
import { ConfigurationService } from 'src/app/service/configuration.service';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit{

 

form: FormGroup = new FormGroup({});
configuracion: Configuration = new Configuration();
mensaje: string = '';
maxFecha: Date = moment().add(-1, 'days').toDate();
id: number = 0;
edicion: boolean = false;



constructor(

  private cS: ConfigurationService,
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
    language: ['', Validators.required],
    notifications: ['', Validators.required],
  });
}
aceptar(): void {
  if (this.form.valid) {

    //this.configuracion.idConfiguration = this.form.value.idConfiguration
    this.configuracion.language = this.form.value.language;
    this.configuracion.notifications = this.form.value.notifications;


    if (this.edicion) {
      this.cS.update(this.configuracion).subscribe(() => {
        this.cS.list().subscribe(data => {
          this.cS.setList(data);
        })
      })
    } else {
      this.cS.insert(this.configuracion).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
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
    this.cS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        idConfiguration: new FormControl(data.idConfiguration),
        language: new FormControl(data.language),
        notifications: new FormControl(data.notifications)
      });
    });
  }
}

}
