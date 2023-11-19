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
import { LogicUser } from 'src/app/model/logicuser';
import { PublicationService } from 'src/app/service/publication.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Interaction } from 'src/app/model/interaction';
import { ViewChild } from '@angular/core';
import { InteractionService } from 'src/app/service/interaction.service';
import { UsersService } from 'src/app/service/users.service';
import { LoginService } from 'src/app/service/login.service';
import { Location } from '@angular/common';

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

  pubTemp: Publication = new Publication();
  usTemp: LogicUser = new LogicUser();

  //elementos de la noticia
  titular: string ="";
  bajada: string ="";
  cuerpo: string ="";
  fecha:  Date = new Date(Date.now())
  objredactor: LogicUser = new LogicUser();
  redactor: string = this.objredactor.nameUser
  apellidoPaterno: string = this.objredactor.fatherSurname
  idRedactor:number = this.objredactor.id
  urlImagen: string = ""
  mostrarImagen: boolean = false;
  objcategoria: Category = new Category ();
  categoria: string = this.objcategoria.nameCategory;
  
  autorComentario:string="";

  contadorLikes:number=0;

  interaccion: Interaction = new Interaction();


  dataSource: MatTableDataSource<Interaction> = new MatTableDataSource();
  displayedColumns: string[] = [

    'comentario'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pS: PublicationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private interaS: InteractionService,
    private uS: UsersService,
    private loginService: LoginService,
    private location: Location
  ) {}
  
  ngOnInit(): void {
  
    this.route.params.subscribe((data: Params) => {
      this.id = +data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    
    this.form = this.formBuilder.group({

      textboxComentario: ['', Validators.required],
      
    });

    this.interaS.list().subscribe((data) => {
      let filteredData = data.filter((inte) => inte.publication.idPublication === this.id);
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.paginator = this.paginator;
    });

    this.interaS.getList().subscribe((data) => {
      let filteredData = data.filter((inte) => inte.publication.idPublication === this.id);
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.paginator = this.paginator;
    });
  }

  comentar(): void {
    this.interaccion = new Interaction();

    if (this.form.valid) {
      this.interaccion.comment = this.form.value.textboxComentario;
      this.interaccion.dateInteraction = new Date(Date.now());
      this.interaccion.liked = false;
      this.interaccion.shared = false; 


      let tempUs;
      this.uS.list().subscribe((data) => {
        tempUs = data.find((usuario) => usuario.username === this.loginService.showUsername());
        if (tempUs && tempUs.id !== 0) {
          this.usTemp.id = +tempUs.id;
          this.interaccion.logicUser = this.usTemp;
      
          this.pubTemp.idPublication = +this.id;
          this.interaccion.publication = this.pubTemp;
          console.log(this.interaccion);
      
          this.interaS.insert(this.interaccion).subscribe((data) => {
            this.interaS.list().subscribe((data) => {
              this.interaS.setList(data);
            });
          });
        } else {
          console.error('Invalid user id');
        }
      });


    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }

    this.interaS.list().subscribe((data) => {
      let filteredData = data.filter((inte) => inte.publication.idPublication === this.id);
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.paginator = this.paginator;
    });

    this.interaS.getList().subscribe((data) => {
      let filteredData = data.filter((inte) => inte.publication.idPublication === this.id);
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.paginator = this.paginator;
    });
  }

  darLike(): void {

    /*
    this.interaS.list().subscribe(interactions => {
      const interactionsWithCondition = interactions.filter(interaction => interaction.publication.idPublication === this.id && interaction.liked === true);
      this.contadorLikes = interactionsWithCondition.length;
    });

    this.interaS.getList().subscribe(interactions => {
      const interactionsWithCondition = interactions.filter(interaction => interaction.publication.idPublication === this.id && interaction.liked === true);
      this.contadorLikes = interactionsWithCondition.length;
    });
    */

    this.contadorLikes = this.contadorLikes + 1;
  }

  
  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.titular=data.headline;
        this.bajada=data.lead;
        this.cuerpo=data.body;
        this.fecha=data.datePublication;
        this.redactor=data.logicUser.nameUser;
        this.categoria=data.category.nameCategory;
        this.apellidoPaterno=data.logicUser.fatherSurname;
        this.idRedactor=data.logicUser.id;
        this.urlImagen=data.attachedFile;
        this.mostrarImagen = this.urlImagen !== "";
      });
    }
   
  }

  getCurrentUrl() {
    alert(this.location.path());
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  
}
