import { formatCurrency } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { LogicUser } from 'src/app/model/logicuser';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { LoginService } from 'src/app/service/login.service';
import { UsersService } from 'src/app/service/users.service';




@Component({
  selector: 'app-latoolbar',
  templateUrl: './latoolbar.component.html',
  styleUrls: ['./latoolbar.component.css']

})
export class LatoolbarComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  palabra: string = '';

  idconfig: number = 0;
  @Input() logued: number = 0;

  usuario: LogicUser = new LogicUser();

  role: string = "";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsersService,
    private cS: ConfigurationService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {

    let tempUs;
    this.uS.list().subscribe((data) => {
      tempUs = data.find((usuario) => usuario.username === this.loginService.showUsername());
      if (tempUs) {
        this.logued = tempUs.id;
        console.log(this.logued);
      }
    });

  }


  //esto sirve para buscar por el ID del USUARIO, cuando es algo que tenga su llave foranea en la tabla USUARIO

  irConfig() {
    this.uS.listId(this.logued).subscribe((usuario) => {
      if (usuario) {
        this.router.navigate(['configuracion', usuario.configuration.idConfiguration]);
      }
    });
  }

  irInicio() {
    this.router.navigate(['inicio']);
  }

  irRegistroPublicacion() {
    this.router.navigate(['registrarPublicacion']);
  }

  irAdmin() {
    this.router.navigate(['administracion']);
  }

  cerrar() {
    sessionStorage.clear();
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    this.palabra = this.form.value.word;
    return control;
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  validarRol() {
    if (this.role == 'REDACTOR' || this.role == 'LECTOR') {
      return true;
    } else {
      return false;
    }
  }
}
