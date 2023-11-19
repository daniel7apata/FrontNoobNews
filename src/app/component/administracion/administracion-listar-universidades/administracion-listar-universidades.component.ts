import { UniversityService } from './../../../service/university.service';
import { University } from './../../../model/university';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-administracion-listar-universidades',
  templateUrl: './administracion-listar-universidades.component.html',
  styleUrls: ['./administracion-listar-universidades.component.css']
})
export class AdministracionListarUniversidadesComponent implements OnInit{
  dataSource: MatTableDataSource<University> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre',      
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private unS: UniversityService) {

  }

  ngOnInit(): void {
    this.unS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.unS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}

