import { InteractionService } from 'src/app/service/interaction.service';
import { Interaction } from 'src/app/model/interaction';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-administracion-listar-interacciones',
  templateUrl: './administracion-listar-interacciones.component.html',
  styleUrls: ['./administracion-listar-interacciones.component.css']
})
export class AdministracionListarInteraccionesComponent implements OnInit{
  dataSource: MatTableDataSource<Interaction> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'fecha',
    'like',
    'compartido',    
    'comentario', 
    'publicacion', 
    'logic' 
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private intS: InteractionService) {

  }

  ngOnInit(): void {
    this.intS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.intS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
