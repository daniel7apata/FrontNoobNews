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
import { Users } from 'src/app/model/users';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: FormGroup = new FormGroup({});
  usuario: Users = new Users();
  mensaje: string = '';

  dataSource: MatTableDataSource<Users> = new MatTableDataSource();

  idUsuario: number = 0;
  edicion: boolean = false;
  constructor(

    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {


    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  aceptar(): void {
    let tempUs;

    this.uS.list().subscribe((data) => {
      tempUs = data.find((usuarioRegistrado) => usuarioRegistrado.username === this.form.value.username && usuarioRegistrado.password === this.form.value.password);

      if (tempUs) {
        if (this.form.valid) {

          this.router.navigate(['inicio']);
          this.usuario = tempUs
        } else {
          this.mensaje = 'Por favor complete todos los campos obligatorios.';
        }
      } else {
        this.mensaje = 'Nombre de usuario o contraseña incorrectos';
      }
    });
    this.idUsuario = this.usuario.idUser;
  }


  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

}
