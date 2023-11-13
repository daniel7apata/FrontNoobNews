import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Configuration } from 'src/app/model/configuration';
import { University } from 'src/app/model/university';
import { Users } from 'src/app/model/users';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-users-registrar',
  templateUrl: './users-registrar.component.html',
  styleUrls: ['./users-registrar.component.css']
})
export class UsersRegistrarComponent implements OnInit{
  form: FormGroup = new FormGroup({});

  //aca cambiamos segun la entidad que tengas
  usuario: Users = new Users();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  configTemp: Configuration = new Configuration();
  univTemp: University = new University();

  constructor(

    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({

      names: ['', Validators.required],
      fathersurname: ['', Validators.required],
      mothersurname: ['', Validators.required],
      email: ['', Validators.required],
      birthdate: ['', Validators.required],
      //username: ['', Validators.required],
      password: ['', Validators.required],
      linkedin: ['', Validators.required],
      //config: ['', Validators.required],
      //univ: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {

      this.usuario.nameUser = this.form.value.names;
      this.usuario.fatherSurname = this.form.value.fathersurname;
      this.usuario.motherSurname = this.form.value.mothersurname;
      this.usuario.email = this.form.value.email;
      this.usuario.birthDate= this.form.value.birthdate;
      this.usuario.enabled=true;
      this.usuario.registrationDate= new Date(Date.now());
      // Genera el nombre de usuario
      this.usuario.username = this.generateUsername(
        this.form.value.names,
        this.form.value.fathersurname,
        this.form.value.mothersurname
      );
      
      this.usuario.password=this.form.value.password;
      this.usuario.profileLinkedIn=this.form.value.linkedin;
      
      //aca deberia cambiarse por el id user de quien inició sesion
      this.configTemp.idConfiguration=1;
      this.usuario.configuration=this.configTemp;
      this.univTemp.idUniversity=1;
      this.usuario.university=this.univTemp;
      

      this.uS.insert(this.usuario).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      });

      this.router.navigate(['login']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }
  generateUsername(names: string, fathersurname: string, mothersurname: string): string {
    // Convierte los nombres y apellidos a minúsculas
    const lowercaseNames = names.toLowerCase();
    const lowercaseFathersurname = fathersurname.toLowerCase();
    const lowercaseMothersurname = mothersurname.toLowerCase();
  
    // Combina los nombres y apellidos en el formato deseado
    const username = lowercaseNames + lowercaseFathersurname + lowercaseMothersurname;
    
    return username;
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  
}
