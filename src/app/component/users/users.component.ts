import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Publication } from 'src/app/model/publication';
import { University } from 'src/app/model/university';
import { Users } from 'src/app/model/users';
import { PublicationService } from 'src/app/service/publication.service';
import { UsersService } from 'src/app/service/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AcknowledgmentService } from 'src/app/service/acknowledgment.service';
import { Acknowledgment } from 'src/app/model/acknowledgment';
import { ExternalPublication } from 'src/app/model/externalPublication';
import { ExternalPublicationService } from 'src/app/service/external-publication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dataSourcePub: MatTableDataSource<Publication> = new MatTableDataSource();
  displayedColumns1: string[] = [
    'titular',
    'bajada',
    'fecha1'
  ];
  @ViewChild(MatPaginator) paginator1!: MatPaginator;

  dataSourceAck: MatTableDataSource<Acknowledgment> = new MatTableDataSource();
  displayedColumns2: string[] = [
    'descripcion',
    'fecha2'
  ];
  @ViewChild(MatPaginator) paginator2!: MatPaginator;


  dataSourceExt: MatTableDataSource<ExternalPublication> = new MatTableDataSource();
  displayedColumns3: string[] = [
    'titularExt',
    'enlace'
  ];
  @ViewChild(MatPaginator) paginator3!: MatPaginator;


  form: FormGroup = new FormGroup({});
  redactor: Users = new Users();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  id: number = 0;
  edicion: boolean = false;


  nombre: string = ""
  apellidoPaterno: string = ""
  apellidoMaterno: string = ""
  email: string = ""
  perfilLinkedIn: string = ""
  fechaRegistro: Date = new Date(Date.now())
  objuniversidad: University = new University()
  universidad: string = this.objuniversidad.nameUniversity


  constructor(
    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private pubS: PublicationService,
    private ackS: AcknowledgmentService,
    private extS: ExternalPublicationService

  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = +data['id']; //el ´+ sirve para convertir en numero
      this.edicion = data['id'] != null;
      this.init();
    });


    //listar publicaciones
    this.pubS.list().subscribe((data) => {
      let filteredData1 = data.filter((publication) => publication.user.idUser === this.id);
      this.dataSourcePub = new MatTableDataSource(filteredData1);
      this.dataSourcePub.paginator = this.paginator1;
    });


    this.pubS.getList().subscribe((data) => {
      let filteredData1 = data.filter((publication) => publication.user.idUser === this.id);
      this.dataSourcePub = new MatTableDataSource(filteredData1);
      this.dataSourcePub.paginator = this.paginator1;
    });

    //listar reconocimientos
    this.ackS.list().subscribe((data) => {
      let filteredData2 = data.filter((acknowledgment) => acknowledgment.user.idUser === this.id);
      this.dataSourceAck = new MatTableDataSource(filteredData2);
      this.dataSourceAck.paginator = this.paginator2;
    });


    this.ackS.getList().subscribe((data) => {
      let filteredData2 = data.filter((acknowledgment) => acknowledgment.user.idUser === this.id);
      this.dataSourceAck = new MatTableDataSource(filteredData2);
      this.dataSourceAck.paginator = this.paginator2;
    });


    //listar publicaciones externas
    this.extS.list().subscribe((data) => {
      let filteredData3 = data.filter((externalPublication) => externalPublication.user.idUser === this.id);
      this.dataSourceExt = new MatTableDataSource(filteredData3);
      this.dataSourceExt.paginator = this.paginator3;
    });


    this.extS.getList().subscribe((data) => {
      let filteredData3 = data.filter((externalPublication) => externalPublication.user.idUser === this.id);
      this.dataSourceExt = new MatTableDataSource(filteredData3);
      this.dataSourceExt.paginator = this.paginator3;
    });


  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.nombre = data.nameUser;
        this.apellidoPaterno = data.fatherSurname;
        this.apellidoMaterno = data.motherSurname;
        this.email = data.email;
        this.perfilLinkedIn = data.profileLinkedIn;
        this.fechaRegistro = data.registrationDate;
        this.universidad = data.university.nameUniversity;
      });
    }

  }


}
