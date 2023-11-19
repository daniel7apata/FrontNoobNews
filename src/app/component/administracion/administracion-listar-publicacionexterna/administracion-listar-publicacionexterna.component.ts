import { ExternalPublicationService } from './../../../service/external-publication.service';
import { ExternalPublication } from './../../../model/externalPublication';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-administracion-listar-publicacionexterna',
  templateUrl: './administracion-listar-publicacionexterna.component.html',
  styleUrls: ['./administracion-listar-publicacionexterna.component.css']
})
export class AdministracionListarPublicacionexternaComponent implements OnInit{
  dataSource: MatTableDataSource<ExternalPublication> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'line',
    'link',
    'logics',    
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private peS: ExternalPublicationService) {

  }

  ngOnInit(): void {
    this.peS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.peS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
