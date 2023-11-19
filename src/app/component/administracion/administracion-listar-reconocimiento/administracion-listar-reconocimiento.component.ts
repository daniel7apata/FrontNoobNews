import { AcknowledgmentService } from './../../../service/acknowledgment.service';
import { Acknowledgment } from './../../../model/acknowledgment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-administracion-listar-reconocimiento',
  templateUrl: './administracion-listar-reconocimiento.component.html',
  styleUrls: ['./administracion-listar-reconocimiento.component.css']
})
export class AdministracionListarReconocimientoComponent implements OnInit{
  dataSource: MatTableDataSource<Acknowledgment> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'description',
    'fecha',
    'logics',    
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private ackS: AcknowledgmentService) {

  }

  ngOnInit(): void {
    this.ackS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.ackS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
