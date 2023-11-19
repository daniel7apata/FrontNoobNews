import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Configuration } from 'src/app/model/configuration';
import { University } from 'src/app/model/university';
import { LogicUser } from 'src/app/model/logicuser';
import { UniversityService } from 'src/app/service/university.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  form: FormGroup = new FormGroup({});
  usuario: LogicUser = new LogicUser();
  mensaje: string = '';

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

  dataSource: MatTableDataSource<LogicUser> = new MatTableDataSource();
  maxFecha: Date = moment().add(-1, 'days').toDate();
  idUsuario: number = 0;
  edicion: boolean = false;
  constructor(

    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uniS:UniversityService,
  ) { }

  ngOnInit(): void {


    this.form = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: [''],
      nacimiento: ['', Validators.required],
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required],
      contraseniaConf: ['', Validators.required],
      linkedin: [''],
      universidad: ['', Validators.required],
    });
 


  }

  registrar() {
    if (this.form.valid) {
      this.usuario.nameUser=this.form.value.nombres;
      this.usuario.fatherSurname = this.form.value.apellidoPaterno;
      this.usuario.motherSurname = this.form.value.apellidoMaterno;
      this.usuario.birthDate = this.form.value.nacimiento;
      this.usuario.email = this.form.value.correo;
      this.usuario.password = this.form.value.contrasenia;
      this.usuario.profileLinkedIn = this.form.value.linkedin;
      this.usuario.registrationDate = new Date(Date.now());
      this.usuario.configuration = new Configuration();
      this.usuario.university.idUniversity = this.form.value.universidad;
      this.usuario.username = this.form.value.nombres+this.form.value.apellidoPaterno+this.form.value.apellidoMaterno;
      this.usuario.enabled = true;


      this.uS.insert(this.usuario).subscribe(()=>{
        this.uS.list().subscribe(data=>{
          this.uS.setList(data);
        })
      });
    this.router.navigate(['login']);

    } else {
      this.mensaje = 'Revise los campos!!!';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
