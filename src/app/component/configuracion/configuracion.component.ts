import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Configuration } from 'src/app/model/configuration';
import { ConnectedDevice } from 'src/app/model/connectedDevice';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { ConnectedDeviceService } from 'src/app/service/connected-device.service';
import { UsersService } from 'src/app/service/users.service';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {



  form: FormGroup = new FormGroup({});
  configuracion: Configuration = new Configuration();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  id: number = 0;
  edicion: boolean = true;
  logued: number = 0

  idiomas: { value: string; viewValue: string }[] = [
    { value: 'Spanish', viewValue: 'Spanish' },
    { value: 'English', viewValue: 'English' },
    { value: 'French', viewValue: 'French' },
    { value: 'German', viewValue: 'German' },
    { value: 'Italian', viewValue: 'Italian' },
    { value: 'Portuguese', viewValue: 'Portuguese' },
    { value: 'Chinese', viewValue: 'Chinese' },
    { value: 'Japanese', viewValue: 'Japanese' },
    { value: 'Korean', viewValue: 'Korean' },
    { value: 'Russian', viewValue: 'Russian' },
    { value: 'Arabic', viewValue: 'Arabic' },
  ];

  estados: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Activadas' },
    { value: false, viewValue: 'Desactivadas' },
  ];

  dataSource: MatTableDataSource<ConnectedDevice> = new MatTableDataSource();
  displayedColumns: string[] = [
    'dispositivo',
    'momento'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(

    private cS: ConfigurationService,
    //private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsersService,
    private dispoS: ConnectedDeviceService,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = +data['idconfig']; //el + sirve para convertir en numero, sin esto no detecta el ID
      this.edicion = data['idconfig'] != null;
      this.init();

      let tempUser
      this.uS.list().subscribe((data) => {
        tempUser = data.find((tempUsu) => tempUsu.configuration.idConfiguration === this.id); if (tempUser) {this.logued = tempUser.idUser;} 
      });


    });

    this.form = this.formBuilder.group({
      //idConfiguration: ['', Validators.required],
      language: ['', Validators.required],
      notifications: ['', Validators.required],
    });

    this.dispoS.list().subscribe((data) => {
      let filteredData = data.filter((dispo) => dispo.configuration.idConfiguration === this.id);
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.paginator = this.paginator;
    });


    this.dispoS.getList().subscribe((data) => {
      let filteredData = data.filter((dispo) => dispo.configuration.idConfiguration === this.id);
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.paginator = this.paginator;
    });

  }

  



  aceptar(): void {
    if (this.form.valid) {
      this.configuracion.idConfiguration = this.id;
      this.configuracion.language = this.form.value.language
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
      this.mensaje = 'Guardado!';
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
    
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idConfiguration: new FormControl(data.idConfiguration),
          language: new FormControl(data.language),
          notifications: new FormControl(data.notifications)
        });
      });
    
  }

}
