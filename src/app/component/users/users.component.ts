import { Component, OnInit,ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent  implements OnInit{

  dataSource: MatTableDataSource<Publication> = new MatTableDataSource();

  displayedColumns: string[] = [
    'titular',
    'bajada',
    'fecha',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  form: FormGroup = new FormGroup({});
  redactor: Users = new Users();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  id: number = 0;
  edicion: boolean = false;


  nombre:string=""
  apellidoPaterno:string=""
  apellidoMaterno:string=""
  email:string=""
  perfilLinkedIn:string=""
  fechaRegistro:Date=new Date(Date.now())
  objuniversidad:University=new University()
  universidad:string=this.objuniversidad.nameUniversity


  constructor(
    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private pubS: PublicationService

  ) {}
  
  ngOnInit(): void {
  
    this.route.params.subscribe((data: Params) => {
      this.id = +data['id']; //el ´+ sirve para convertir en numero
      this.edicion = data['id'] != null;
      this.init();
    });

    this.pubS.list().subscribe((data) => {
      let filteredData = data.filter((publication) => publication.user.idUser === this.id);
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.paginator = this.paginator;
    });


    this.pubS.getList().subscribe((data) => {
      let filteredData = data.filter((publication) => publication.user.idUser === this.id);
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.paginator = this.paginator;
    });
  
    
  }
  
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.nombre=data.nameUser;
        this.apellidoPaterno=data.fatherSurname;
        this.apellidoMaterno=data.motherSurname;
        this.email=data.email;
        this.perfilLinkedIn=data.profileLinkedIn;
        this.fechaRegistro=data.registrationDate;
        this.universidad=data.university.nameUniversity;
      });
    }
   
  }


}
