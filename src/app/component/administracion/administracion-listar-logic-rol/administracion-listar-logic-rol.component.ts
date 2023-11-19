import { LogicrolService } from 'src/app/service/logicrol.service';
import { LogicRol } from './../../../model/logicrol';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-administracion-listar-logic-rol',
  templateUrl: './administracion-listar-logic-rol.component.html',
  styleUrls: ['./administracion-listar-logic-rol.component.css']
})
export class AdministracionListarLogicRolComponent implements OnInit{
  dataSource: MatTableDataSource<LogicRol> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'rol',
    'permisoedit',
    'logics',    
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private logS: LogicrolService) {

  }

  ngOnInit(): void {
    this.logS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.logS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
