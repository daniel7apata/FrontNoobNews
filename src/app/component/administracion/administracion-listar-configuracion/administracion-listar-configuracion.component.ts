import { ConfigurationService } from './../../../service/configuration.service';
import { Configuration } from './../../../model/configuration';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-administracion-listar-configuracion',
  templateUrl: './administracion-listar-configuracion.component.html',
  styleUrls: ['./administracion-listar-configuracion.component.css']
})
export class AdministracionListarConfiguracionComponent implements OnInit{
  dataSource: MatTableDataSource<Configuration> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'language',
    'notificacion',     
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private conS: ConfigurationService) {}
  ngOnInit(): void {
    this.conS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.conS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
