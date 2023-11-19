import { ConnectedDeviceService } from './../../../service/connected-device.service';
import { ConnectedDevice } from './../../../model/connectedDevice';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-administracion-listar-dispositivo-conectado',
  templateUrl: './administracion-listar-dispositivo-conectado.component.html',
  styleUrls: ['./administracion-listar-dispositivo-conectado.component.css']
})
export class AdministracionListarDispositivoConectadoComponent implements OnInit{
  dataSource: MatTableDataSource<ConnectedDevice> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'fecha',
    'tiempo',   
    'configuracion'   
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private disS: ConnectedDeviceService) {

  }

  ngOnInit(): void {
    this.disS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.disS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
