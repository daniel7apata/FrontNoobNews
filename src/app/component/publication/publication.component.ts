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
import { Category } from 'src/app/model/category';

import { Publication } from 'src/app/model/publication';
import { Users } from 'src/app/model/users';
import { PublicationService } from 'src/app/service/publication.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  publicacion: Publication = new Publication();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  id: number = 0;
  edicion: boolean = false;

  //elementos de la noticia
  titular: string ="";
  bajada: string ="";
  cuerpo: string ="";
  fecha:  Date = new Date(Date.now())
  objredactor: Users = new Users();
  redactor: string = this.objredactor.nameUser
  apellidoPaterno: string = this.objredactor.fatherSurname
  idRedactor:number = this.objredactor.idUser
  urlImagen: string = ""
  mostrarImagen: boolean = false;
  objcategoria: Category = new Category ();
  categoria: string = this.objcategoria.nameCategory
  

  constructor(
    private pS: PublicationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
  
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
  
    
  }
  
  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.titular=data.headline;
        this.bajada=data.lead;
        this.cuerpo=data.body;
        this.fecha=data.datePublication;
        this.redactor=data.user.nameUser;
        this.categoria=data.category.nameCategory;
        this.apellidoPaterno=data.user.fatherSurname;
        this.idRedactor=data.user.idUser;
        this.urlImagen=data.attachedFile;
        this.mostrarImagen = this.urlImagen !== "";
      });
    }
   
  }
  
}
