import { CategoryService } from './../../../service/category.service';
import { Category } from './../../../model/category';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-administracion-listar-categoria',
  templateUrl: './administracion-listar-categoria.component.html',
  styleUrls: ['./administracion-listar-categoria.component.css']
})
export class AdministracionListarCategoriaComponent implements OnInit{
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre',        
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private catS: CategoryService) {}
  ngOnInit(): void {
    this.catS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.catS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
