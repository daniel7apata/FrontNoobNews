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
import { Users } from 'src/app/model/users';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { UsersService } from 'src/app/service/users.service';


@Component({
  selector: 'app-latoolbar',
  templateUrl: './latoolbar.component.html',
  styleUrls: ['./latoolbar.component.css']
})
export class LatoolbarComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  palabra:string = '';

  idconfig: number=0;
  @Input() logued: number=0;
  usuprue:Users=new Users();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsersService,
    private cS:ConfigurationService,
  ) {}
  
  ngOnInit(): void {
   
  }


  //esto sirve para buscar por el ID del USUARIO, cuando es algo que tenga su llave foranea en la tabla USUARIO

  aceptar() {
    this.uS.listId(this.logued).subscribe((usuario) => {
      if (usuario) {
        this.router.navigate(['configuracion',usuario.configuration.idConfiguration]);
      } 
    });

   
  }

  
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    this.palabra=this.form.value.word;
    return control;
  }
}
