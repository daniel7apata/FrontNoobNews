import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Publication } from 'src/app/model/publication';
import { Users } from 'src/app/model/users';
import { PublicationService } from 'src/app/service/publication.service';

@Component({
  selector: 'app-publication-registrar',
  templateUrl: './publication-registrar.component.html',
  styleUrls: ['./publication-registrar.component.css']
})
export class PublicationRegistrarComponent implements OnInit{
  form: FormGroup = new FormGroup({});

  //aca cambiamos segun la entidad que tengas
  publicacion: Publication = new Publication();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  usTemp: Users = new Users();

  constructor(

    private pS: PublicationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({

      headline: ['', Validators.required],
      lead: [''],
      body: ['', Validators.required],
      attachedFile: [''],
      
    });
  }
  aceptar(): void {
    if (this.form.valid) {

      this.publicacion.headline = this.form.value.headline;
      this.publicacion.lead = this.form.value.lead;
      this.publicacion.body = this.form.value.body;
      this.publicacion.attachedFile = this.form.value.attachedFile;
      this.publicacion.datePublication= new Date(Date.now());
      this.publicacion.popular=false;
      //aca deberia cambiarse por el id user de quien inició sesion
      this.usTemp.idUser=1;
      this.publicacion.user=this.usTemp;


      this.pS.insert(this.publicacion).subscribe((data) => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data);
        });
      });

      this.router.navigate(['inicio']);
    } else {
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
  
}
