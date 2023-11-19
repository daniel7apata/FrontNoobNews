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
import { LogicUser } from 'src/app/model/logicuser';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { ConnectedDeviceService } from 'src/app/service/connected-device.service';
import { LoginService } from 'src/app/service/login.service';
import { UsersService } from 'src/app/service/users.service';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {



  form: FormGroup = new FormGroup({});
  usuario:LogicUser = new LogicUser();
  formPerfil: FormGroup = new FormGroup({});
  configuracion: Configuration = new Configuration();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  id: number = 0;
  edicion: boolean = true;
  edicionPerfil: boolean = false;
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

  listaUniversidades: { value: number; viewValue: string }[] = [
    { value: 1, viewValue: 'UPN' },
    { value: 2, viewValue: 'PUCP' },
    { value: 3, viewValue: 'UNMSM' },
    { value: 4, viewValue: 'UNI' },
    { value: 5, viewValue: 'UTP' },
    { value: 6, viewValue: 'USIL' },
    { value: 7, viewValue: 'ULIMA' },
    { value: 8, viewValue: 'UDEP' },
    { value: 9, viewValue: 'UNFV' },
    { value: 10, viewValue: 'UTEC' },

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
    private loginService: LoginService,
    private formBuilderPerfil: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = +data['idconfig']; //el + sirve para convertir en numero, sin esto no detecta el ID
      this.edicion = data['idconfig'] != null;
      this.init();

      let tempUser
      this.uS.list().subscribe((data) => {
        tempUser = data.find((tempUsu) => tempUsu.configuration.idConfiguration === this.id); if (tempUser) {this.logued = tempUser.id;} 
      });


      let tempUs;
      this.uS.list().subscribe((data) => {
        tempUs = data.find((usuario) => usuario.username === this.loginService.showUsername());
        if (tempUs) {
          this.logued = tempUs.id;
          console.log(this.logued);
        }
      });

      this.init();
  


    });

    this.form = this.formBuilder.group({
      //idConfiguration: ['', Validators.required],
      language: ['', Validators.required],
      notifications: ['', Validators.required],
    });

    this.formPerfil = this.formBuilderPerfil.group({
      nombres: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      nacimiento: ['', Validators.required],
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required],
      linkedin: ['', Validators.required],
      universidad: ['', Validators.required],
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
  

  actualizarPerfil(): void {


    let tempUs;
    this.uS.list().subscribe((data) => {
      tempUs = data.find((usuario) => usuario.username === this.loginService.showUsername());
      if (tempUs) {
        if (this.form.valid) {
          this.usuario.id = tempUs.id;
          this.usuario.nameUser = this.formPerfil.value.nombres;
          this.usuario.fatherSurname = this.formPerfil.value.apellidoPaterno;
          this.usuario.motherSurname = this.formPerfil.value.apellidoMaterno;
          this.usuario.birthDate = this.formPerfil.value.nacimiento;
          this.usuario.email = this.formPerfil.value.correo;
          this.usuario.password = this.formPerfil.value.contrasenia;
          this.usuario.profileLinkedIn = this.formPerfil.value.linkedin;
          this.usuario.university.idUniversity = this.formPerfil.value.universidad;
          this.usuario.configuration.idConfiguration = this.id;
          this.usuario.username = (this.formPerfil.value.nombres + this.formPerfil.value.apellidoPaterno).toLowerCase();
          console.log(this.usuario)
    
          if (this.edicion) {
            this.uS.update(this.usuario).subscribe(() => {
              this.uS.list().subscribe(data => {
                this.uS.setList(data);
              })
            })
          } else {
            this.uS.insert(this.usuario).subscribe((data) => {
              this.uS.list().subscribe((data) => {
                this.uS.setList(data);
              });
            });
          }
        } 
         else {
         this.mensaje = 'Por favor complete todos los campos obligatorios.';
        }
      }
    });



  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  obtenerControlCampo2(nombreCampo: string): AbstractControl {
    const control = this.formPerfil.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  init() {

    let tempUs;
    this.uS.list().subscribe((data) => {
      tempUs = data.find((usuario) => usuario.username === this.loginService.showUsername());
      if (tempUs) {
        this.uS.listId(tempUs.id).subscribe((data) => {
          this.formPerfil = new FormGroup({
            nombres: new FormControl(data.nameUser),
            apellidoPaterno: new FormControl(data.fatherSurname),
            apellidoMaterno: new FormControl(data.motherSurname),
            nacimiento: new FormControl(data.birthDate),
            correo: new FormControl(data.email),
            contrasenia: new FormControl(data.password),
            linkedin: new FormControl(data.profileLinkedIn),
            universidad: new FormControl(data.university),
          });
    
        });
      }
    });
    
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idConfiguration: new FormControl(data.idConfiguration),
          language: new FormControl(data.language),
          notifications: new FormControl(data.notifications)
        });
      });
    
  }

  verificar() {
    let token = sessionStorage.getItem("token");
    return token != null;

  }

}
