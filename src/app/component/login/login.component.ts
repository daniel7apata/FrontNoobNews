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
import { LogicUser } from 'src/app/model/logicuser';
import { UsersService } from 'src/app/service/users.service';
import { JwtRequest } from 'src/app/model/jwtRequest';
import { LoginService } from 'src/app/service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  usuario: LogicUser = new LogicUser();


  username: string = ""
  password: string = ""
  mensaje: string = ""

  constructor(

    private uS: UsersService,
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /*
  aceptar(): void {
    let tempUs;

    this.uS.list().subscribe((data) => {
      tempUs = data.find((usuarioRegistrado) => usuarioRegistrado.username === this.form.value.username && usuarioRegistrado.password === this.form.value.password);

      if (tempUs) {
        if (this.form.valid) {
          this.logued = tempUs.idUser;
          this.router.navigate(['inicio',this.logued]);
          this.usuario = tempUs;
        } else {
          this.mensaje = 'Por favor complete todos los campos obligatorios.';
        }
      } else {
        this.mensaje = 'Nombre de usuario o contraseÃ±a incorrectos';
      }

    });
    this.idUsuario = this.usuario.idUser;
  }
*/

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe((data: any) => {
      sessionStorage.setItem("token", data.jwttoken);
      this.router.navigate(['inicio']);
    }, error => {
      this.mensaje = "Credenciales incorrectas!!!"
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    });
  }


  irRegistro() {
    let request = new JwtRequest();
    request.username = "lauragutierrez";
    request.password = "unocero";
    this.loginService.login(request).subscribe((data: any) => {
      sessionStorage.setItem("token", data.jwttoken);
      this.router.navigate(['registro']);
    }, error => {
      this.mensaje = "Credenciales incorrectas!!!"
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    });
  }

}