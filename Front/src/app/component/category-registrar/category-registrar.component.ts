import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { LogicUser } from 'src/app/model/logicuser';
import { CategoryService } from 'src/app/service/category.service';
import { LoginService } from 'src/app/service/login.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-category-registrar',
  templateUrl: './category-registrar.component.html',
  styleUrls: ['./category-registrar.component.css']
})
export class CategoryRegistrarComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'categoria'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //aca cambiamos segun la entidad que tengas
  categoria: Category = new Category();
  mensaje: string = '';
  usTemp: LogicUser = new LogicUser();
  logued:number=0;

  constructor(

    private cS: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsersService,
    private loginService: LoginService,
  ) {}
  
  ngOnInit(): void {

    let tempUs;
    this.uS.list().subscribe((data) => {
      tempUs = data.find((usuario) => usuario.username === this.loginService.showUsername());
      if (tempUs) {
        this.logued = tempUs.id;
        console.log(this.logued);
      }
    });

    this.form = this.formBuilder.group({

      namecategory: ['', Validators.required],
    });
    //esto es lo importante para listar no el getList
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  aceptar(): void {
    if (this.form.valid) {

      this.categoria.nameCategory = this.form.value.namecategory;
      
      this.usTemp.id=this.logued;

      this.cS.insert(this.categoria).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });

      this.router.navigate(['inicio']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }
  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  
}
